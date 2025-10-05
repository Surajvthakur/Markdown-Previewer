import React, { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css'; // You can choose other themes like white, league, sky, etc.

const Presentation = ({ markdownContent, onExit }) => {
  const deckRef = useRef(null);

  useEffect(() => {
    if (deckRef.current) {
      const deck = new Reveal(deckRef.current, {
        plugins: [Markdown],
        embedded: true, // Important for running in a div
        keyboard: {
          27: () => onExit(), // Use the 'ESC' key to exit presentation mode
        },
      });
      deck.initialize();
    }
  }, [onExit]);

  return (
    <div className="presentation-container">
      <button onClick={onExit} className="exit-presentation-button">
        Exit Presentation (ESC)
      </button>
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          {/* Reveal.js's Markdown plugin finds this section and renders the content.
            The '---' separator creates vertical slides.
            Use '--' for horizontal slides.
          */}
          <section data-markdown data-separator="---" data-separator-vertical="--">
            <textarea data-template defaultValue={markdownContent}></textarea>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Presentation;