import { useEffect, useState } from 'react';

export function useTypingEffect(phrases, typingSpeed = 80, pauseMs = 2200) {
  const [display, setDisplay] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex % phrases.length];
    let timeout;

    if (!isDeleting && display === phrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => setDisplay((d) => d.slice(0, -1)), typingSpeed / 2);
    } else {
      timeout = setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, phraseIndex, phrases, pauseMs, typingSpeed]);

  return display;
}
