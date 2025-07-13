'use client';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/Loading";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import "swiper/css";
import "swiper/css/effect-coverflow";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?limit=8");
        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.products;

        if (Array.isArray(productList)) {
          productList.sort((a: Product, b: Product) => a.id - b.id);
          setProducts(productList);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <AnimateOnScroll>
      <section id="products" className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] min-h-screen flex flex-col justify-center py-16">
        <h2 className="text-3xl font-bold mb-12 tracking-tight drop-shadow-sm text-center">
          Products
        </h2>

        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          loop
          centeredSlides
          slidesPerView="auto"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mySwiper"
          spaceBetween={30}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} style={{ width: 350, height: 450 }}>
              <Link
                href={`/product/${p.id}`}
                className="group block h-full w-full relative rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-lg mt-1">฿{p.price.toLocaleString()}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </AnimateOnScroll>
  );
}