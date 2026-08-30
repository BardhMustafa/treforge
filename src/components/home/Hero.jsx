import { Link } from "react-router-dom";
import { useBriefModal } from "../../context/BriefModalContext";
import { CLIENTS } from "../../data/clients";

export function Hero() {
  const { openBrief } = useBriefModal();
  const featuredClient = CLIENTS.find(client => client.slug === 'pronex');
  return (
    <section id="hero" className="client-hero">
      <div className="hero-layout">
        <div>
          <span className="eyebrow">Digital products · Applied AI</span>
          <h1>Good ideas.<br /><span>Useful products.</span></h1>
          <p className="hero-intro">Websites, commerce, and AI-assisted workflows built around how your business actually works.</p>
          <p className="hero-support">From the first prototype to launch, we help you shape the right solution—and build it with you.</p>
          <div className="action-row">
            <button className="primary-action" onClick={openBrief}>Discuss your project <span aria-hidden="true">↗</span></button>
            <a className="text-action" href="#clients">Explore our work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <Link className="hero-project" to={`/clients/${featuredClient.slug}`}>
          <div className="project-frame"><img src={featuredClient.screenshot} alt="Pronex real estate website and property listings" fetchPriority="high" /></div>
          <div className="hero-project-caption"><div><span className="eyebrow">Featured work · {featuredClient.name}</span><h2>A property platform.<br />Built beyond the listing.</h2><p>Property website + management panel<br />AI Çmimi pricing assistant (prototype)</p></div><span aria-hidden="true">↗</span></div>
        </Link>
      </div>
      <div className="client-proof"><span>Built with businesses in Kosova</span><div>{CLIENTS.map(client => <Link key={client.slug} to={`/clients/${client.slug}`}>{client.name}</Link>)}</div></div>
    </section>
  );
}
