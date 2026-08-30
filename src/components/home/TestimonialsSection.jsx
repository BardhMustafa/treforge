import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { CLIENTS } from "../../data/clients";

const REVIEWS = CLIENTS.filter((c) => c.testimonial?.quote);

export function TestimonialsSection() {
  if (REVIEWS.length === 0) return null;

  return (
    <section
      id="testimonials"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <SectionLabel>In their words</SectionLabel>
      <SectionTitle>What our clients say.</SectionTitle>
      <p className="section-intro">
        The people we build with, in their own words—from a first prototype to a
        product that keeps running.
      </p>

      <div className="testimonial-grid">
        {REVIEWS.map((c) => {
          const meta = [c.tag, c.location, c.testimonial.date]
            .filter(Boolean)
            .join(" · ");
          return (
            <figure key={c.slug} className="testimonial-card">
              <span className="testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{c.testimonial.quote}</blockquote>
              <figcaption>
                <span className="testimonial-name">
                  {c.name}
                  {c.testimonial.attribution ? ` · ${c.testimonial.attribution}` : ""}
                </span>
                {meta && <span className="testimonial-meta">{meta}</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
