import { Link } from "react-router-dom";

export function AIAgentsSpotlight() {
  return (
    <section id="ai-agents" className="ai-story">
      <div className="ai-story-copy">
        <span className="eyebrow">Applied AI · A practical starting point</span>
        <h2>Start with a real decision.<br /><span>Not just a chatbot.</span></h2>
        <p>For Pronex, that decision is a property’s asking price. AI Çmimi explores how pricing guidance can fit into the listing experience, where sellers need it.</p>
        <p>We start with a focused prototype, test the workflow, and identify where an AI agent can add genuine value.</p>
        <Link className="text-action" to="/services/ai-integration">Explore our AI approach <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="pricing-story">
        <div className="pricing-story-header"><div><span className="eyebrow">Pronex · Property pricing</span><h3>AI Çmimi</h3></div><span className="status-pill">Prototype</span></div>
        <ol className="pricing-steps">
          <li><span>01</span><div><h4>Describe the property</h4><p>Start with its location, size, and asking price.</p></div></li>
          <li><span>02</span><div><h4>Put the price in context</h4><p>Compare the details with reference pricing data.</p></div></li>
          <li><span>03</span><div><h4>Make an informed decision</h4><p>Review the guidance. The final price stays with the seller.</p></div></li>
        </ol>
        <div className="prototype-note"><strong>Today:</strong> a rules-based pricing prototype.<br /><strong>Next:</strong> a proposed agent workflow using AWS AgentCore.</div>
      </div>
    </section>
  );
}
