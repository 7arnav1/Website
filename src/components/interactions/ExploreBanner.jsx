import { useEffect, useState } from 'react';

const STORAGE_KEY = 'universe-v1-explore-banner';

export default function ExploreBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="explore-banner" role="status">
      <p>
        <strong>Scroll to explore</strong> — click the glowing planets for projects.
      </p>
      <button type="button" className="explore-banner-dismiss" onClick={dismiss} aria-label="Dismiss">
        Got it
      </button>
    </div>
  );
}
