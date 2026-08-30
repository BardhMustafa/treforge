import { Link } from "react-router-dom";
import { useBriefModal } from "../../context/BriefModalContext";
import { CLIENTS } from "../../data/clients";

export function Hero() {
  const { openBrief } = useBriefModal();
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
        <Link className="hero-project" to="/clients/hm-home">
          <div className="project-frame"><img src="/clients/hm-home.jpg" alt="HM Home furniture e-commerce website" fetchPriority="high" /></div>
          <div className="hero-project-caption"><div><span className="eyebrow">Featured work · HM Home</span><h2>A storefront for customers.<br />A workspace for the team.</h2><p>E-commerce + product & order management</p></div><span aria-hidden="true">↗</span></div>
        </Link>
      </div>
      <div className="client-proof"><span>Built with businesses in Kosova</span><div>{CLIENTS.map(client => <Link key={client.slug} to={`/clients/${client.slug}`}>{client.name}</Link>)}</div></div>
    </section>
  );
}
