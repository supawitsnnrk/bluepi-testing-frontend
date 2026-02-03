import type {
  ProductAndStock,
  ProductStock,
} from "../../../shared/types/products";

interface ProductCardProps {
  product: ProductAndStock;
  index: number;
  isSelected: boolean;
  isProcessing?: boolean;
  onSelect: (product: ProductAndStock) => void;
}

const ProductCard = ({
  product,
  index,
  isSelected,
  isProcessing = false,
  onSelect,
}: ProductCardProps) => {
  const totalStock = (product.productStock as ProductStock)?.quantity || 0;
  const isOutOfStock = totalStock === 0;

  const handleClick = () => {
    if (!isOutOfStock && !isProcessing) {
      onSelect(product);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 transition-all duration-300 border-4 ${
        isOutOfStock || isProcessing
          ? "opacity-50 cursor-not-allowed border-gray-300"
          : "cursor-pointer hover:scale-105 hover:shadow-xl"
      } ${
        isSelected ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"
      }`}
    >
      <div className="text-center">
        <div className="text-xs bg-gray-800 text-white rounded-full px-3 py-1 mb-2 inline-block">
          #{index + 1}
        </div>
        {isOutOfStock && (
          <div className="text-xs bg-red-500 text-white rounded-full px-3 py-1 mb-2 inline-block font-bold">
            OUT OF STOCK
          </div>
        )}
        <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
        <div className="text-2xl font-bold text-green-600">
          ฿{product.price.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 mt-2">Stock: {totalStock}</div>
      </div>
    </div>
  );
};

export default ProductCard;
