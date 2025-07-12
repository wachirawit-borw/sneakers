export default function Footer() {
    type FooterBlockProps = { title: string; children: React.ReactNode };

    function FooterBlock({ title, children }: FooterBlockProps) {
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
            </div>
        );
    }

    type FooterListProps = { title: string; items: string[] };

    function FooterList({ title, items }: FooterListProps) {
        return (
            <div>
                <h3 className="font-bold mb-3">{title}</h3>
                <ul className="space-y-1 text-sm">
                    {items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <>
            <section id="explore">
                <footer className="bg-gradient-to-r from-[#f2d3b6] to-[#4e73a4] text-black px-4 sm:px-6 py-16">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                        <FooterBlock title="ZURFRK">
                            <div className="flex gap-4 text-black text-xl">
                                <i className="fab fa-x-twitter hover:text-blue-600 transition" />
                                <i className="fab fa-instagram hover:text-pink-500 transition" />
                                <i className="fab fa-youtube hover:text-red-600 transition" />
                                <i className="fab fa-linkedin hover:text-blue-700 transition" />
                            </div>
                        </FooterBlock>

                        <FooterList
                            title="Use cases"
                            items={[
                                "UI design",
                                "UX design",
                                "Wireframing",
                                "Diagramming",
                                "Brainstorming",
                                "Online whiteboard",
                                "Team collaboration",
                            ]}
                        />

                        <FooterList
                            title="Category"
                            items={[
                                "Men’s Shoes",
                                "New Arrivals",
                                "Casual Collection",
                                "Limited Edition",
                                "Size & Fit",
                                "Lookbook",
                            ]}
                        />

                        <FooterList
                            title="Explore"
                            items={[
                                "Design",
                                "Prototyping",
                                "Development features",
                                "Design systems",
                                "Collaboration features",
                                "Design process",
                                "FigJam",
                            ]}
                        />
                    </div>
                </footer>
            </section>
        </>
    );
}