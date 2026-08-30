import { useState } from "react";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { CLIENTS } from "../../data/clients";

const REVIEWS = CLIENTS.filter((c) => c.testimonial?.quote);

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  if (REVIEWS.length === 0) return null;

  const move = (direction) =>
    setActive((index) => (index + direction + REVIEWS.length) % REVIEWS.length);

  const c = REVIEWS[active];
  const meta = [c.tag, c.location, c.testimonial.date].filter(Boolean).join(" · ");

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

      <div className="testimonial-carousel">
        <figure key={c.slug} className="testimonial-card testimonial-slide">
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

        <div className="testimonial-controls">
          <div className="testimonial-nav">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
          <div className="testimonial-dots">
            {REVIEWS.map((r, index) => (
              <button
                type="button"
                key={r.slug}
                className={index === active ? "is-active" : ""}
                aria-label={`Show ${r.name} testimonial`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <span className="testimonial-count">
            {active + 1} / {REVIEWS.length}
          </span>
        </div>
      </div>
    </section>
  );
}
