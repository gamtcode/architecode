/**
 * Home Page — Section Orchestrator
 *
 * Pure composition layer that assembles all landing page sections.
 * Contains no business logic — each section component is self-contained.
 * Content is injected from homeContent (content-driven architecture).
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechCarousel from "@/components/TechCarousel";
import About from "@/components/About";
import Structure from "@/components/Structure";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Articles from "@/components/Articles";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ClientEffects } from "@/components/ClientEffects";
import { homeContent } from "@/content/home";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <ClientEffects />
            <div id="tsparticles-global" className="fixed inset-0 z-[-10]"></div>
            <Navbar items={homeContent.navbar.links} />
            <ChatWidget />
            <Hero rotatingPhrases={homeContent.hero.rotatingPhrases} />
            <TechCarousel
                items={homeContent.techCarousel.items}
                label={homeContent.techCarousel.label}
            />
            <About
                header={homeContent.about.header}
                intro={homeContent.about.intro}
                mission={homeContent.about.mission}
                items={homeContent.about.items}
            />
            <Structure
                header={homeContent.structure.header}
                problems={homeContent.structure.problems}
                solutions={homeContent.structure.solutions}
            />
            <Services
                header={homeContent.services.header}
                items={homeContent.services.items}
            />
            <Solutions
                header={homeContent.solutions.header}
                items={homeContent.solutions.items}
            />
            <Articles
                header={homeContent.articles.header}
                items={homeContent.articles.items}
            />
            <Clients
                header={homeContent.clients.header}
                items={homeContent.clients.items}
            />
            <Contact
                header={homeContent.contact.header}
                intro={homeContent.contact.intro}
                links={homeContent.contact.links}
            />
            <Footer
                copyright={homeContent.footer.copyright}
                tagline={homeContent.footer.tagline}
            />
        </main>
    );
}
