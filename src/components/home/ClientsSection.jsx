import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { CLIENTS } from "../../data/clients";
import { ClientCard } from "./ClientCard";

export function ClientsSection() {
  return (
    <section
      id="clients"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <SectionLabel>Selected work</SectionLabel>
      <SectionTitle>Built for real businesses.</SectionTitle>
      <p className="section-intro">From a furniture storefront to a property platform: explore what we built, who it serves, and how it fits into the business.</p>
      <div className="client-grid">
        {CLIENTS.map((c) => (
          <ClientCard key={c.slug} {...c} />
        ))}
      </div>
    </section>
  );
}
