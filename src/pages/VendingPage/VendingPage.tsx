import { useEffect, useState } from "react";
import type {
  ProductAndStock,
  ProductStock,
} from "../../shared/types/products";
import { vendingService } from "../../services";
import type { Denominations } from "../../shared/types/denominations";
import Modal from "../../shared/components/Modal";
import type {
  DepositCashRequest,
  ChangeDetailDto,
} from "../../shared/types/order";
import { useModal } from "../../shared/hooks/useModal";
import ProductCard from "./components/ProductCard";
import PaymentPanel from "./components/PaymentPanel";

const VendingPage = () => {
  const [products, setProducts] = useState<ProductAndStock[]>([]);
  const [denominations, setDenominations] = useState<Denominations[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductAndStock | null>(null);
  const [insertedMoney, setInsertedMoney] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  // Modal hook
  const { modal, showModal, closeModal } = useModal();

  // Helper: Decrease product stock by 1
  const decreaseProductStock = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId && product.productStock) {
          const currentStock = product.productStock as ProductStock;
          return {
            ...product,
            productStock: {
              ...currentStock,
              quantity: Math.max(0, currentStock.quantity - 1),
            },
          };
        }
        return product;
      }),
    );
  };

  // Helper: Format change details to readable string
  const formatChangeDetails = (change: ChangeDetailDto[]): string => {
    return change
      .map((coin) => `฿${coin.amount.toFixed(2)} x ${coin.quantity}`)
      .join("\n");
  };

  // Helper: Build purchase success message
  const buildPurchaseSuccessMessage = (
    changeAmount: number,
    change: ChangeDetailDto[],
  ): string => {
    if (changeAmount === 0) {
      return "Purchase successful!";
    }

    const changeDetails = formatChangeDetails(change);
    return `Purchase successful!\n\nYour change: ฿${changeAmount.toFixed(2)}\n\n${changeDetails}`;
  };

  // Helper: Reset transaction state
  const resetTransactionState = () => {
    setCurrentOrderId(null);
    setInsertedMoney(0);
    setSelectedProduct(null);
  };

  // Helper: Get or create order ID
  const getOrCreateOrderId = async (): Promise<string> => {
    if (currentOrderId) return currentOrderId;
    const orderResponse = await vendingService.createOrder();
    return orderResponse.orderId;
  };

  const handleSelectProduct = async (product: ProductAndStock) => {
    if (isSelectingProduct) return; // Prevent double click

    setIsSelectingProduct(true);

    try {
      const orderId = await getOrCreateOrderId();
      const selectResponse = await vendingService.selectProduct(
        orderId,
        product.id,
      );

      if (selectResponse.success) {
        setCurrentOrderId(orderId);
        setSelectedProduct(product);
      } else {
        showModal("Failed to select product", "error", "Error");
      }
    } catch (error) {
      console.error("Error selecting product:", error);
      showModal(
        "Failed to select product. Please try again.",
        "error",
        "Error",
      );
    } finally {
      setIsSelectingProduct(false);
    }
  };

  const cancelTransaction = async () => {
    if (!currentOrderId) {
      return showModal("No active transaction to cancel.", "info", "Info");
    }

    try {
      const cancelResponse = await vendingService.cancelOrder(currentOrderId);

      if (cancelResponse?.refundAmount > 0) {
        showModal(
          `Returning ฿${cancelResponse.refundAmount.toFixed(2)}`,
          "info",
          "Transaction Canceled",
        );
      }

      resetTransactionState();
    } catch (error) {
      console.error("Error canceling transaction:", error);
      showModal(
        "Failed to cancel transaction. Please try again.",
        "error",
        "Error",
      );
    }
  };

  const depositCash = async (denominationId: string) => {
    try {
      const depositRequest: DepositCashRequest = {
        denominationId,
        qty: 1,
        ...(currentOrderId && { orderId: currentOrderId }),
      };
      const depositResponse = await vendingService.depositCash(depositRequest);

      if (!depositResponse.success) return;

      if (!currentOrderId) {
        setCurrentOrderId(depositResponse.orderId);
      }
      setInsertedMoney(depositResponse.totalAmount);
    } catch (error) {
      console.error("Error depositing cash:", error);
      showModal("Failed to deposit cash. Please try again.", "error", "Error");
    }
  };

  const purchaseOrder = async () => {
    if (!currentOrderId) return;

    // Validate selected product
    if (!selectedProduct) {
      showModal(
        "Please select a product first.",
        "warning",
        "No Product Selected",
      );
      return;
    }

    // Validate sufficient funds
    if (insertedMoney < selectedProduct.price) {
      const needed = selectedProduct.price - insertedMoney;
      showModal(
        `Insufficient funds!\nPlease insert ฿${needed.toFixed(2)} more.`,
        "warning",
        "Insufficient Funds",
      );
      return;
    }

    setIsDispensing(true);

    try {
      const purchaseResponse =
        await vendingService.purchaseOrder(currentOrderId);

      if (purchaseResponse.success) {
        // Simulate dispensing animation
        setTimeout(() => {
          // Update stock locally
          if (selectedProduct) {
            decreaseProductStock(selectedProduct.id);
          }

          // Reset transaction
          resetTransactionState();

          // Show success message with change details
          const message = buildPurchaseSuccessMessage(
            purchaseResponse.changeAmount,
            purchaseResponse.change,
          );
          showModal(message, "success", "Success");
          setIsDispensing(false);
        }, 1500);
      } else {
        setIsDispensing(false);
      }
    } catch (error) {
      console.error("Error purchasing order:", error);
      showModal(
        "Failed to complete purchase. Please try again.",
        "error",
        "Error",
      );
      setIsDispensing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        // Fetch products and denominations in parallel
        const [productsData, denominationsData] = await Promise.all([
          vendingService.getProducts(),
          vendingService.getDenominations(),
        ]);

        if (!isMounted) return;

        // Set products
        setProducts(productsData || []);
        if (productsData?.length === 0) {
          console.warn("No products available in the vending machine.");
        }

        // Set denominations
        setDenominations(denominationsData || []);
        if (denominationsData?.length === 0) {
          console.warn("No denominations available.");
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("Error fetching initial data:", error);
        showModal(
          "Failed to load data. Please refresh the page.",
          "error",
          "Error",
        );
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            🥤 Vending Machine
          </h1>
          <p className="text-gray-600 text-lg">Select your favorite products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-gray-800">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>🛒</span> Available Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>
              {/* Selection Action */}
              {selectedProduct && (
                <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Selected:</p>
                        <p className="font-bold text-xl text-gray-800">
                          {selectedProduct.name}
                        </p>
                        <p className="text-green-600 font-semibold">
                          ฿{selectedProduct.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={cancelTransaction}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Panel */}
          <div className="lg:col-span-1">
            <PaymentPanel
              insertedMoney={insertedMoney}
              selectedProduct={selectedProduct}
              denominations={denominations}
              isDispensing={isDispensing}
              onDepositCash={depositCash}
              onPurchase={purchaseOrder}
              onCancel={cancelTransaction}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

export default VendingPage;
