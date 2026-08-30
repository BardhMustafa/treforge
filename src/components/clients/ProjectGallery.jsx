import { useId, useState } from "react";

export function ProjectGallery({ images, name, note }) {
  const [active, setActive] = useState(0);
  const [failedSource, setFailedSource] = useState(null);
  const captionId = useId();
  const current = images[active];
  const move = (direction) => setActive(index => (index + direction + images.length) % images.length);

  return (
    <section className="project-gallery" aria-label={`${name} screenshot gallery`}>
      <div className="gallery-heading">
        <div><span className="eyebrow">Inside the application</span><h2>Screen gallery</h2></div>
        <span>{images.length} screens · Desktop application</span>
      </div>
      {note && <p className="gallery-note">{note}</p>}
      <figure>
        <div className="gallery-stage">
          {failedSource === current.src ? <p role="status">This screenshot could not load. Try another screen below.</p> : (
            <img src={current.src} alt={current.alt} width="1800" height="1000" aria-describedby={captionId} onError={() => setFailedSource(current.src)} />
          )}
        </div>
        <figcaption id={captionId} className="gallery-caption" aria-live="polite" aria-atomic="true">
          <div><h3>{current.title}</h3><p>{current.caption}</p></div>
          <span>{active + 1} / {images.length}</span>
        </figcaption>
      </figure>
      <div className="gallery-controls">
        <div><button type="button" onClick={() => move(-1)} aria-label="Previous screenshot">← Previous</button><button type="button" onClick={() => move(1)} aria-label="Next screenshot">Next →</button></div>
        <a className="text-action" href={current.src} target="_blank" rel="noopener noreferrer">Open full-size image ↗</a>
      </div>
      <div className="gallery-thumbnails" aria-label="Choose a screenshot">
        {images.map((item, index) => (
          <button type="button" key={item.src} onClick={() => setActive(index)} aria-pressed={index === active} aria-label={`Show ${item.title.toLowerCase()}`}>
            <img src={item.src} alt="" width="1800" height="1000" loading="lazy" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
