'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
 * Refactored to use Client Component with fetch API for submission.
 * Handles loading, error states, and redirects to /success on completion.
 */
export default function Contact({ header, intro, links }: ContactProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/send-email.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Erro no envio');
            }

            router.push('/success');
        } catch (err) {
            console.error(err);
            setError('Não foi possível enviar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

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
                                        onClick={() => {
                                            if (link.href.startsWith('mailto:') && typeof window !== 'undefined' && window.gtag) {
                                                window.gtag('event', 'email_click', {
                                                    event_category: 'micro_conversion',
                                                    event_label: 'contact_email'
                                                });
                                            }
                                        }}
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
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    disabled={loading}
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all disabled:opacity-50"
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
                                    disabled={loading}
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all disabled:opacity-50"
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
                                    disabled={loading}
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all disabled:opacity-50"
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
                                    disabled={loading}
                                    className="w-full bg-white/20 border-secondary/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-white/70 transition-all disabled:opacity-50"
                                ></textarea>
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-100 hover:bg-white text-[#3A5A7A] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? 'Enviando...' : 'Enviar Mensagem'}
                            </button>
                        </form>
                    </div>
                </div>
            </FadeUp>
        </section>
    );
}

