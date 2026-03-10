import Image from 'next/image';

const clients = [
  { name: 'TimeSmart.AI', industry: 'Healthcare SaaS', logo: '/images/clients/timesmart.png', url: 'https://timesmart.ai/', scale: true },
  { name: 'SMOOR', industry: 'Manufacturing', logo: '/images/clients/smoor.png', url: 'https://smoor.in/' },
  { name: 'Hapicare', industry: 'Healthcare SaaS', logo: '/images/clients/hapicare.png', url: 'https://www.hapicare.com/' },
  { name: 'IBA Collections', industry: 'Retail', logo: '/images/clients/iba.png', url: 'https://ibacart.com/' },
  { name: 'SeedFlex', industry: 'FinTech', logo: '/images/clients/seedflex.png', url: 'https://www.seedflex.com/' },
];

export function ClientsSection() {
  return (
    <section className="clients-section" id="clients">
      <div className="section-header reveal">
        <div className="section-label">Trusted By</div>
        <h2 className="section-title">
          Companies that <span className="gradient">trust us.</span>
        </h2>
        <p className="section-subtitle">
          From healthcare to fintech — delivering AI-powered solutions across industries.
        </p>
      </div>

      <div className="clients-logo-grid reveal">
        {clients.map((client) => (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="client-logo-card"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={160}
              height={60}
              className={`client-logo-img${client.scale ? ' scaled' : ''}`}
            />
            <span className="client-industry">{client.industry}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
