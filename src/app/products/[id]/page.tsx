export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';

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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">หน้าแรก</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">สินค้า</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden group">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                  </button>
                </div>

                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                    product.stock > 0 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {product.stock > 0 ? 'มีสินค้า' : 'หมด'}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery (Placeholder) */}
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-colors">
                    <Image
                      src={product.imageUrl}
                      alt={`${product.name} ${i}`}
                      width={80}
                      height={80}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Product Header */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8/5.0 จาก 124 รีวิว)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-blue-600">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ฿{(product.price * 1.2).toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    ลด 17%
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Stock Info */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">สต๊อกคงเหลือ:</span>
                  <span className="font-medium text-gray-900">{product.stock} ชิ้น</span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">จำนวน:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="p-2 hover:bg-gray-100 transition-colors">
                    <span className="text-lg font-medium">-</span>
                  </button>
                  <span className="px-4 py-2 font-medium">1</span>
                  <button className="p-2 hover:bg-gray-100 transition-colors">
                    <span className="text-lg font-medium">+</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.stock > 0 ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</span>
                  </div>
                </button>
                
                <button
                  disabled={product.stock === 0}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-medium hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                >
                  ซื้อทันที
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">ส่งฟรี</p>
                    <p className="text-xs text-gray-500">สั่งซื้อขั้นต่ำ ฿500</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">รับประกัน</p>
                    <p className="text-xs text-gray-500">1 ปี</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <RotateCcw className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">คืนได้</p>
                    <p className="text-xs text-gray-500">7 วัน</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Specifications */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">รายละเอียดสินค้า</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">รหัสสินค้า:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">วันที่เพิ่มสินค้า:</span>
                  <span className="font-medium">{new Date(product.createdAt).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">น้ำหนัก:</span>
                  <span className="font-medium">1.2 กิโลกรัม</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">ขนาด:</span>
                  <span className="font-medium">30 x 20 x 10 ซม.</span>
                </div>
              </div>
            </div>

            {/* Reviews Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">รีวิวล่าสุด</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">โดย สมชาย</span>
                  </div>
                  <p className="text-sm text-gray-700">สินค้าคุณภาพดี ส่งเร็ว บรรจุภัณฑ์ดี</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-600">โดย สมหญิง</span>
                  </div>
                  <p className="text-sm text-gray-700">ดีมาก ราคาสมเหตุสมผล</p>
                </div>
                
                <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                  ดูรีวิวทั้งหมด
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}