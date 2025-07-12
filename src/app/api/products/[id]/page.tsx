import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

async function getProduct(id: string) {
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    return null;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        stock: true,
        createdAt: true
      }
    });

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="text-2xl font-semibold text-blue-600">
                ฿{product.price.toLocaleString()}
              </div>

              {product.description && (
                <div className="prose prose-gray">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  สต๊อก: {product.stock} ชิ้น
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? 'มีสินค้า' : 'หมด'}
                </span>
              </div>

              <button
                disabled={product.stock === 0}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {product.stock > 0 ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}