import Link from 'next/link';
import SuccessTracker from './SuccessTracker';
import { ClientEffects } from '../../components/ClientEffects';

export const metadata = {
    robots: {
        index: false,
        follow: false
    }
};

export default function SuccessPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-primary px-4 relative overflow-hidden">
            <ClientEffects />
            <div id="tsparticles-global" className="fixed inset-0 z-0"></div>

            <SuccessTracker />
            <div className="max-w-md w-full text-center space-y-8 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm relative z-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,193,212,0.3)] hover:border-accent/30 group">
                <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i data-feather="check" className="w-10 h-10 text-green-400"></i>
                </div>

                <h1 className="text-3xl font-bold text-white font-heading">
                    Mensagem Enviada!
                </h1>

                <p className="text-secondary text-lg">
                    Agradecemos o seu interesse nas soluções Architecode e em breve entraremos em contato.
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        Página Principal
                    </Link>
                </div>
            </div>
        </main>
    );
}
