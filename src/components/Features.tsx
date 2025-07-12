export default function Features() {
    
    type FeatureProps = { icon: string; title: string; text: string };

    function Feature({ icon, title, text }: FeatureProps) {
        return (
            <div className="w-full sm:w-[250px] flex flex-col items-center text-center">
                <span className="text-3xl mb-4">{icon}</span>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-800">{text}</p>
            </div>
        );
    }

    return (
        <>
            <section id="features" className="bg-gradient-to-r from-[#f0cca8] to-[#ccdef5] py-20 px-6 text-black text-center">
                <h2 className="text-3xl font-bold mb-12 tracking-tight drop-shadow-sm">Features</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
                    <Feature icon="🪶" title="Lightweight" text="Walk freely all day with ultra-light cushioning." />
                    <Feature icon="⚡" title="Fast Shipping" text="Your order ships within 24 hours, guaranteed." />
                    <Feature icon="🧍" title="Elegant Design" text="Minimal, bold and timeless — design with presence." />
                </div>
            </section>
        </>
    )
}