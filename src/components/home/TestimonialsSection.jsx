import { useState, useEffect } from "react";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { CLIENTS } from "../../data/clients";

const REVIEWS = CLIENTS.filter((c) => c.testimonial?.quote);
const AUTOPLAY_MS = 6000;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || REVIEWS.length <= 1) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(
      () => setActive((index) => (index + 1) % REVIEWS.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [paused, active]);

  if (REVIEWS.length === 0) return null;

  const move = (direction) =>
    setActive((index) => (index + direction + REVIEWS.length) % REVIEWS.length);

  return (
    <section
      id="testimonials"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}
    >
      <div className="testimonials-layout">
        <div className="testimonials-intro">
          <SectionLabel>In their words</SectionLabel>
          <SectionTitle>What our clients say.</SectionTitle>
          <p className="section-intro">
            The people we build with, in their own words—from a first prototype
            to a product that keeps running.
          </p>
        </div>

        <div
          className="testimonial-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <div className="testimonial-stage">
            {REVIEWS.map((r, index) => {
              const meta = [r.tag, r.location, r.testimonial.date]
                .filter(Boolean)
                .join(" · ");
              return (
                <figure
                  key={r.slug}
                  className={`testimonial-card testimonial-slide${
                    index === active ? " is-active" : ""
                  }`}
                  aria-hidden={index !== active}
                >
                  <span className="testimonial-quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote>{r.testimonial.quote}</blockquote>
                  <figcaption>
                    <span className="testimonial-name">
                      {r.name}
                      {r.testimonial.attribution
                        ? ` · ${r.testimonial.attribution}`
                        : ""}
                    </span>
                    {meta && <span className="testimonial-meta">{meta}</span>}
                  </figcaption>
                </figure>
              );
            })}
          </div>

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
      </div>
    </section>
  );
}
