import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
};

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const isNew = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
  return createdDate > sevenDaysAgo;
};

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const newProduct = isNew(product.createdAt);
  const lowStock = product.stock <= 10;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ${
        viewMode === 'list' ? 'flex flex-row gap-4' : 'block'
      }`}
    >
      {/* Image */}
      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
        <div className="relative w-full aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {newProduct && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              NEW
            </span>
          )}
          {lowStock && !newProduct && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              LOW STOCK
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-md font-bold text-gray-900">
          ฿{product.price.toLocaleString()}
        </p>

        {viewMode === 'list' && (
          <div className="mt-2 text-sm text-gray-500">
            สินค้าคงเหลือ: {product.stock} ชิ้น
          </div>
        )}
      </div>
    </Link>
  );
}
