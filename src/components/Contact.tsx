import { SectionHeader, LinkItem } from "@/types/content";
import FadeUp from "./ui/FadeUp";

interface ContactProps {
    header: SectionHeader;
    intro: string;
    links: LinkItem[];
}

/**
 * Contact section with form and link list.
 *
 * Form submits to `send-email.php` (server-side processing).
 * No client-side form handling or validation — static site architecture.
 */
export default function Contact({ header, intro, links }: ContactProps) {
    return (
        <section
            id="contact"
            className="py-14 md:py-20 relative overflow-hidden scroll-mt-16"
        >
            <FadeUp>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 relative z-10">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white">
                            {header.title}
                        </h2>

                        <p className="text-lg text-secondary mt-6 mb-12 text-justify hyphens-auto">
                            {intro}
                        </p>

                        <ul className="space-y-6 mt-4 list-none p-0 m-0">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="flex items-center text-white hover:text-accent group transition-colors"
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                    >
                                        <div className="hexagon flex items-center justify-center w-12 h-12 bg-accent/20 mr-4 shrink-0">
                                            <i data-feather={link.icon} className="w-5 h-5 text-accent"></i>
                                        </div>
                                        <span className="group-hover:underline">{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className="bg-white/10 p-8 rounded-lg border border-secondary/10 h-full"
                    >
                        <form action="send-email.php" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nome"
                                    required
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefone" className="sr-only">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    id="telefone"
                                    placeholder="Telefone"
                                    required
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Mensagem
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    placeholder="Mensagem"
                                    required
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-100 hover:bg-white text-[#3A5A7A] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </FadeUp>
        </section>
    );
}
