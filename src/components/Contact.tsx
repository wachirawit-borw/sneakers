import Image from "next/image";

export default function Contact() {


    return (
        <>
            <section
                id="contact"
                className="relative w-full h-[500px] bg-black overflow-hidden flex items-center justify-center text-white"
            >
                <Image
                    src="/picture/subscribe.webp"
                    alt="Subscribe background"
                    fill
                    className="object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-xl">
                    <h2 className="text-3xl font-bold mb-2">Subscribe now</h2>
                    <p className="text-lg mb-6 text-gray-100">Sign up for our newsletter</p>
                    <form className="flex flex-col w-full max-w-md gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded bg-white text-black placeholder-gray-500"
                        />
                        <button type="submit" className="w-full px-6 py-2 bg-black text-white rounded">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}