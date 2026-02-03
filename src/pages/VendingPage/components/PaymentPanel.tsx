import type { ProductAndStock } from "../../../shared/types/products";
import type { Denominations } from "../../../shared/types/denominations";

interface PaymentPanelProps {
  insertedMoney: number;
  selectedProduct: ProductAndStock | null;
  denominations: Denominations[];
  isDispensing: boolean;
  isProcessing: boolean;
  onDepositCash: (denominationId: string) => void;
  onPurchase: () => void;
  onCancel: () => void;
}

const PaymentPanel = ({
  insertedMoney,
  selectedProduct,
  denominations,
  isDispensing,
  isProcessing,
  onDepositCash,
  onPurchase,
  onCancel,
}: PaymentPanelProps) => {
  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 text-white sticky top-8">
      {/* Money Display */}
      <div className="bg-green-900 rounded-xl p-6 mb-6 border-4 border-green-700">
        <div className="text-center">
          <p className="text-sm text-green-400 mb-1">Inserted</p>
          <p className="text-4xl font-bold text-green-300 font-mono">
            ฿{insertedMoney.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Selected Product Display */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>📦</span> Selected
        </h3>
        <div className="bg-gray-800 rounded-xl p-4 min-h-[120px] flex items-center justify-center">
          {!selectedProduct ? (
            <p className="text-gray-500 text-center">No product selected</p>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">
                      {selectedProduct.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      #{selectedProduct.id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xl font-bold mt-3">
                <span>Price:</span>
                <span className="text-yellow-400">
                  ฿{selectedProduct.price.toFixed(2)}
                </span>
              </div>
              {insertedMoney > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Change:</span>
                    <span
                      className={
                        insertedMoney >= selectedProduct.price
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                      }
                    >
                      ฿{(insertedMoney - selectedProduct.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Denomination Buttons */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">💰 Insert Money</h3>
        <div className="grid grid-cols-2 gap-2">
          {denominations.map((denom) => (
            <button
              key={denom.id}
              onClick={() => onDepositCash(denom.id)}
              disabled={isProcessing}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ฿{denom.amount.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onPurchase}
          disabled={!selectedProduct || isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isDispensing ? "🔄 Dispensing..." : "Purchase"}
        </button>
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPanel;
