"use client";
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { useCallback } from 'react';
import { Search, Filter, Grid, List, Star } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(
    async (currentPage: number = 1, searchTerm: string = '') => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          search: searchTerm,
          sortBy,
          sortOrder
        });

        const response = await fetch(`/api/products?${params}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [sortBy, sortOrder]
  );

  useEffect(() => {
    fetchProducts(page, search);
  }, [fetchProducts, page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1, search);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const sortOptions = [
    { label: 'ใหม่ล่าสุด', value: 'createdAt', order: 'desc' as const },
    { label: 'เก่าสุด', value: 'createdAt', order: 'asc' as const },
    { label: 'ราคา: ต่ำ-สูง', value: 'price', order: 'asc' as const },
    { label: 'ราคา: สูง-ต่ำ', value: 'price', order: 'desc' as const },
    { label: 'ชื่อ A-Z', value: 'name', order: 'asc' as const },
    { label: 'ชื่อ Z-A', value: 'name', order: 'desc' as const },
  ];

  const categories = [
    { name: 'รองเท้าผ้าใบ', count: 45 },
    { name: 'รองเท้าหนัง', count: 32 },
    { name: 'รองเท้าส้นสูง', count: 28 },
    { name: 'รองเท้าแตะ', count: 19 },
    { name: 'รองเท้าบูท', count: 15 },
  ];

  const brands = [
    { name: 'Nike', count: 35 },
    { name: 'Adidas', count: 28 },
    { name: 'Converse', count: 22 },
    { name: 'Vans', count: 18 },
    { name: 'Puma', count: 15 },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#f0cca8]/10 to-[#ccdef5]/10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Our Collection
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              เลือกชมรองเท้าทั้งหมดจาก ZURFRK ที่เราตั้งใจคัดสรรมาเพื่อคุณ
            </p>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาสินค้า, แบรนด์, หรือหมวดหมู่..."
                  className="w-full px-6 py-4 pl-14 pr-32 text-lg border-2 border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-lg placeholder-gray-500"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full hover:shadow-lg transition-all font-medium"
                >
                  ค้นหา
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{products.length}</div>
                <div className="text-sm text-gray-600">สินค้า</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">5+</div>
                <div className="text-sm text-gray-600">แบรนด์</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">24/7</div>
                <div className="text-sm text-gray-600">บริการ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">ตัวกรอง</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">หมวดหมู่</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3 accent-orange-500" />
                            <span className="text-gray-700">{category.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">ช่วงราคา</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                          placeholder="ต่ำสุด"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                          placeholder="สูงสุด"
                        />
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] text-gray-800 rounded-lg hover:shadow-md transition-all font-medium">
                        ใช้ตัวกรอง
                      </button>
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">แบรนด์</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-3 accent-orange-500" />
                            <span className="text-gray-700">{brand.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {brand.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">คะแนน</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                          <input type="checkbox" className="mr-3 accent-orange-500" />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-gray-700">{rating}.0 ขึ้นไป</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">
                      แสดงผล {products.length} รายการ
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">เรียงโดย:</span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [newSortBy, newSortOrder] = e.target.value.split('-');
                        handleSortChange(newSortBy, newSortOrder as 'asc' | 'desc');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={`${option.value}-${option.order}`} value={`${option.value}-${option.order}`}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Loading, Error, and Products */}
              {loading && (
                <div className="flex justify-center items-center py-16">
                  <LoadingSpinner />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <div className="text-red-600 text-lg font-medium">เกิดข้อผิดพลาด: {error}</div>
                  <button
                    onClick={() => fetchProducts(page, search)}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    ลองใหม่
                  </button>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                  <div className="text-gray-600 text-lg">ไม่พบสินค้าที่ตรงกับการค้นหา</div>
                  <button
                    onClick={() => {
                      setSearch('');
                      setPage(1);
                      fetchProducts(1, '');
                    }}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] text-gray-800 rounded-lg hover:shadow-md transition-all font-medium"
                  >
                    ดูสินค้าทั้งหมด
                  </button>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <>
                  <div className={`grid gap-6 ${viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1'
                    }`}>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </div>

                  {/* Enhanced Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="text-gray-600">
                          แสดงหน้า {page} จาก {totalPages} หน้า
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setPage(1)}
                            disabled={page <= 1}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                          >
                            หน้าแรก
                          </button>

                          <button
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 1}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                          >
                            ก่อนหน้า
                          </button>

                          {/* Page Numbers */}
                          <div className="flex space-x-1">
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                              let pageNum = i + 1;
                              if (totalPages > 5) {
                                if (page <= 3) {
                                  pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                  pageNum = totalPages - 4 + i;
                                } else {
                                  pageNum = page - 2 + i;
                                }
                              }

                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setPage(pageNum)}
                                  className={`px-3 py-2 rounded-lg transition-colors ${page === pageNum
                                      ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                          >
                            ถัดไป
                          </button>

                          <button
                            onClick={() => setPage(totalPages)}
                            disabled={page >= totalPages}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                          >
                            หน้าสุดท้าย
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}