/**
 * Home Page Content
 *
 * Single source of truth for all landing page copy and configuration.
 * Decoupled from components — UI reads this data, never owns it.
 *
 * Structure mirrors HomePageContent type exactly.
 */

import { HomePageContent } from "../types/content";

export const homeContent: HomePageContent = {
    // --- Navigation ---
    navbar: {
        links: [
            { label: "Sobre", href: "#about", icon: "users" },
            { label: "Serviços", href: "#services", icon: "cpu" },
            { label: "Soluções", href: "#solutions", icon: "zap" },
            { label: "Artigos", href: "#articles", icon: "book-open" },
            { label: "Contato", href: "#contact", icon: "mail" },
        ],
    },

    // --- Hero Section ---
    hero: {
        header: {
            title: "Arquiteturas robustas.",
            highlight: "Soluções transformadoras.",
        },
        rotatingPhrases: [
            "Arquitetura e BRBREAK Engenharia de BRBREAK Software BRBREAK orientadas a BRBREAK soluções BRBREAK transformadoras",
            "Desempenho e BRBREAK confiabilidade na BRBREAK orquestração de BRBREAK sistemas com BRBREAK inteligência BRBREAK artificial",
            "Engenharia de BRBREAK dados para BRBREAK decisões de BRBREAK negócios com BRBREAK agilidade e BRBREAK precisão",
        ],
    },

    // --- Tech Carousel ---
    techCarousel: {
        label: {
            title: "Arquiteturas <b>robustas</b>.",
            subtitle: "Soluções <b>transformadoras</b>.",
            description:
                "Construímos <b>soluções</b> sobre as tecnologias e arquiteturas mais <b>robustas</b> e <b>inovadoras</b> do mercado.",
        },
        items: [
            { name: "Java", img: "java.svg" },
            { name: "Spring Boot", img: "springboot.svg" },
            { name: "C#", img: "csharp.svg" },
            { name: ".NET", img: "dotnet.svg" },
            { name: "Python", img: "python.svg" },
            { name: "Node.js", img: "nodejs.svg" },
            { name: "React", img: "react.svg" },
            { name: "Next.js", img: "nextjs.svg" },
            { name: "Tailwind", img: "tailwind.svg" },
            { name: "Flutter", img: "flutter.svg" },
            { name: "Kotlin", img: "kotlin.svg" },
            { name: "Swift", img: "swift.svg" },
            { name: "PostgreSQL", img: "postgresql.svg" },
            { name: "MongoDB", img: "mongodb.svg" },
            { name: "Redis", img: "redis.svg" },
            { name: "Supabase", img: "supabase.svg" },
            { name: "AWS", img: "aws.svg" },
            { name: "Azure", img: "azure.svg" },
            { name: "Docker", img: "docker.svg" },
            { name: "Kubernetes", img: "kubernetes.svg" },
            { name: "RabbitMQ", img: "rabbitmq.svg" },
            { name: "Kafka", img: "kafka.svg" },
            { name: "OpenAI", img: "openai.svg" },
            { name: "Gemini", img: "gemini.svg" },
            { name: "LangChain", img: "langchain.svg" },
            { name: "n8n", img: "n8n.svg" },
            { name: "Zep", img: "zep.svg" },
            { name: "Grafana", img: "grafana.svg" },
            { name: "Prometheus", img: "prometheus.svg" },
        ],
    },

    // --- About Section ---
    about: {
        header: {
            title: "Seja bem-vindo a Architecode",
        },
        intro: [
            "A <b>Architecode</b> não é apenas uma consultoria; somos parceiros estratégicos especializados em estabelecer a fundação e a infraestrutura do seu futuro digital. Nossa expertise se concentra na Arquitetura e Engenharia de Software de precisão, desenvolvendo sistemas robustos, escaláveis e sob medida que não apenas atendem às necessidades atuais do seu negócio, mas que também estão preparados para absorver o crescimento exponencial de amanhã.",
            "Nossas áreas de excelência transcendem o desenvolvimento tradicional. Somos pioneiros na integração de Inteligência Artificial (IA) e na implementação de complexas automações inteligentes, que são projetadas e implementadas com um objetivo claro: otimizar processos de missão crítica, reduzir custos operacionais e acelerar de forma sustentável o crescimento e a vantagem competitiva dos nossos clientes em seus respectivos mercados.",
        ],
        mission:
            "Nossa missão é transformar visão em valor. Projetamos, implementamos e orquestramos ecossistemas de software de alto desempenho que se tornam o motor de resultados concretos. Entregamos sistemas que otimizam integralmente as suas operações e se integram perfeitamente à estratégia de escala do seu negócio.",
        items: [
            {
                title: "Design Centrado no Usuário",
                description:
                    "Criamos soluções intuitivas e eficazes. Utilizamos metodologias de UX/UI para garantir que cada sistema não apenas resolva problemas complexos, mas também seja fácil de usar, maximizando a adoção e o retorno sobre o investimento.",
                icon: "user-check",
            },
            {
                title: "Arquitetura Escalável",
                description:
                    "Desenvolvemos fundações tecnológicas sólidas e resilientes, prontas para crescer. Nossa arquitetura, baseada em nuvem e microsserviços, garante que seu software mantenha alto desempenho, segurança e flexibilidade.",
                icon: "zap",
            },
            {
                title: "Parceria Estratégica",
                description:
                    "Atuamos como parceiros de tecnologia de longo prazo. Priorizamos a transparência e a colaboração contínua, garantindo que a estratégia técnica esteja sempre alinhada para impulsionar resultados concretos no seu negócio.",
                icon: "users",
            },
        ],
    },

    // --- Structure Section ---
    structure: {
        header: {
            title: "Estrutura inteligente para o seu negócio",
            description:
                "Transformamos suas ideias e necessidades em soluções de software robustas e eficientes.",
        },
        problems: [
            {
                title: "Processos Manuais",
                description: "Processos manuais estão atrasando sua operação?",
                icon: "x",
            },
            {
                title: "Sistemas Legados",
                description: "Sistemas legados limitando seu crescimento?",
                icon: "x",
            },
            {
                title: "Dados e Insights",
                description: "Dificuldade em extrair insights valiosos dos seus dados?",
                icon: "x",
            },
        ],
        solutions: [
            {
                title: "Automação",
                description:
                    "Automação inteligente de processos para aumentar eficiência.",
                icon: "check",
            },
            {
                title: "Modernização",
                description: "Modernização de sistemas com arquitetura escalável.",
                icon: "check",
            },
            {
                title: "Soluções de IA",
                description:
                    "Soluções de IA para transformar dados em vantagem competitiva.",
                icon: "check",
            },
        ],
    },

    // --- Services Section ---
    services: {
        header: {
            title: "Nossas Áreas de Excelência",
            description:
                "Desenvolvemos sistemas consistentes e sob medida para seu negócio.",
        },
        items: [
            {
                title: "Engenharia de Software",
                description:
                    "Desenvolvimento de software sob medida com arquitetura robusta, código limpo e alta escalabilidade para crescer com seu negócio.",
                icon: "code",
            },
            {
                title: "Inteligência Artificial",
                description:
                    "Soluções de IA e Machine Learning personalizadas para extrair valor dos seus dados e automatizar decisões complexas.",
                icon: "cpu",
            },
            {
                title: "Automações",
                description:
                    "Automação de processos (RPA) para eliminar tarefas repetitivas, reduzir erros e aumentar a produtividade da sua equipe.",
                icon: "play-circle",
            },
        ],
    },

    // --- Solutions Section ---
    solutions: {
        header: {
            title: "Nossas Plataformas",
            description:
                "Arquiteturas proprietárias desenvolvidas para escalar resultados.",
        },
        items: [
            {
                title: "NOVA Framework",
                subtitle: "Neural Orchestration for Value-driven Agents",
                description:
                    "Sistema de inteligência distribuída onde múltiplos agentes neurais são orquestrados deterministicamente. O NOVA entrega conversas robustas e centradas no usuário, garantindo alta escalabilidade técnica e consistência operacional.",
                link: {
                    label: "Conhecer o NOVA",
                    href: "https://nova.architecode.com",
                },
            },
            {
                title: "PULSE System",
                subtitle: "Prospective User & Lead Strategy Engine",
                description:
                    "Motor estratégico que transforma interação em receita. O PULSE atua como um cérebro de conversão, qualificando leads e conduzindo vendas complexas automaticamente através de canais como Instagram e WhatsApp.",
                link: {
                    label: "Conhecer o PULSE",
                    href: "https://pulse.architecode.com",
                },
            },
            {
                title: "PRIME System",
                subtitle: "Platform for Routing Intelligent Multi-agent Execution",
                description:
                    "Plataforma de execução que centraliza a inteligência operacional. O PRIME atua como um orquestrador de fluxo, interpretando a intenção do usuário e roteando demandas automaticamente para o especialista ideal dentro de uma rede de 150 agentes de IA de alta performance.",
                link: {
                    label: "Conhecer o PRIME",
                    href: "https://prime.architecode.com",
                },
            },
        ],
    },

    // --- Articles Section ---
    articles: {
        header: {
            title: "Insights e Conhecimento",
            description:
                "Insights técnicos que transformam complexidade em vantagem competitiva.",
        },
        items: [
            {
                title: "Princípios de Design para Sistemas Escaláveis",
                description:
                    "Como projetar sistemas que crescem com seu negócio sem comprometer performance ou manutenibilidade.",
                link: {
                    label: "ARQUITETURA DE SOFTWARE",
                    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406599882049929216",
                },
            },
            {
                title: "IA Generativa no Mundo Corporativo",
                description:
                    "Aplicações práticas de modelos generativos para otimizar processos e criar novas oportunidades.",
                link: {
                    label: "INTELIGÊNCIA ARTIFICIAL",
                    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406605525208993792",
                },
            },
            {
                title: "RPA: Quando Automatizar e Quando Não",
                description:
                    "Critérios para identificar processos ideais para automação robótica e quando outras soluções são mais adequadas.",
                link: {
                    label: "AUTOMAÇÃO",
                    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406609541326610432",
                },
            },
        ],
    },

    // --- Clients Section ---
    clients: {
        header: {
            title: "Confiança de BRBREAK Grandes Empresas",
            description: "Veja o que nossos clientes dizem sobre nossas soluções.",
        },
        items: [
            {
                quote:
                    "Nosso serviço foi otimizado de forma notável graças à plataforma criada pela Architecode. Sua solução sofisticada integra Engenharia de Inteligência Artificial de forma genial e intuitiva, fortalecendo nossa imagem e eficiência no mercado de tecnologia e gestão de capital.",
                author: "Marcelo Mecchi",
                role: "Founder and CEO",
                company: "Aquamarine Capital",
                link: {
                    label: "Conheça a Aquamarine Capital",
                    href: "https://aquamarineprivate.com.br",
                },
            },
            {
                quote:
                    "No cenário corporativo atual, a confiança é o alicerce de qualquer parceria tecnológica. Parceiros que unem competência e integridade são nosso maior ativo. Conheço a liderança à frente da Architecode e recomendo pela seriedade, comprometimento e organização.",
                author: "Joel Ligiero",
                role: "Founder and CEO",
                company: "ICE do Brasil",
                link: {
                    label: "Conheça a ICE do Brasil",
                    href: "https://icebrasil.com.br",
                },
            },
        ],
    },

    // --- Contact Section ---
    contact: {
        header: {
            title: "Vamos Conversar",
        },
        intro:
            "Pronto para transformar seus desafios em soluções de software inteligentes? Entre em contato para uma consultoria sem compromisso.",
        links: [
            {
                label: "contato@architecode.com",
                href: "mailto:contato@architecode.com",
                icon: "mail",
            },
            {
                label: "+55 (12) 98199-6782",
                href: "https://api.whatsapp.com/send?phone=5512981996782&text=Ol%C3%A1!%20Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20e%20solu%C3%A7%C3%B5es%20da%20Architecode.",
                icon: "phone",
            },
            {
                label: "linkedin.com/company/architecode",
                href: "https://linkedin.com/company/architecode",
                icon: "linkedin",
            },
        ],
    },

    // --- Footer ---
    footer: {
        copyright: "© 2025 Architecode. Todos os direitos reservados.",
        tagline: "Software Architecture and Engineering",
    },
};
