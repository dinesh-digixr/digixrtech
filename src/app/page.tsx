import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { BlueprintsSection } from '@/components/sections/BlueprintsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <BlueprintsSection />

      {/* Placeholder sections — will be replaced by real components in later steps */}
      <section id="cta" style={{ minHeight: '50vh', background: 'var(--dark-bg)', padding: '80px 64px' }}>
        <div className="section-header">
          <div className="section-label">Challenge Us</div>
          <h2 className="section-title">
            Tell our agent what you&apos;re trying to <span className="gradient">solve.</span>
          </h2>
          <p className="section-subtitle">
            Tell us what you&apos;re solving — our agent will map it to an architecture before you finish your coffee.
          </p>
        </div>
      </section>
    </>
  );
}
