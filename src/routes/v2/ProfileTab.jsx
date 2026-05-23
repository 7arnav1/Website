import { useState } from 'react';
import { site } from '../../data/site';
import { profileDeck, ROLE_FILTERS, buildProfileFeed } from '../../data/v2ProfileDeck';
import HingeFilterPills from '../../components/v2/HingeFilterPills';
import HingePhotoCard from '../../components/v2/HingePhotoCard';
import HingePromptCard from '../../components/v2/HingePromptCard';
import SendLikeSheet from '../../components/v2/SendLikeSheet';
import { IconVerifiedBadge, IconShare, IconMore } from '../../components/v2/HingeIcons';

export default function ProfileTab() {
  const [filter, setFilter] = useState('AI');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState('');

  const openSheet = (title) => {
    setSheetTitle(title);
    setSheetOpen(true);
  };

  const feed = buildProfileFeed(profileDeck, filter);

  return (
    <div className="hinge-scroll">
      <HingeFilterPills filters={ROLE_FILTERS} active={filter} onChange={setFilter} />

      <header className="hinge-profile-header">
        <div className="hinge-profile-header-row">
          <div>
            <h1 className="hinge-profile-name">{site.name.split(' ')[0]}</h1>
            <div className="hinge-profile-meta">
              <span className="hinge-active-dot" aria-hidden="true" />
              <span className="hinge-active-text">Active now</span>
              <span>·</span>
              <span>he/him</span>
              <span className="hinge-verified">
                <IconVerifiedBadge />
                Verified
              </span>
            </div>
          </div>
          <div className="hinge-header-actions">
            <a href={site.resume} className="hinge-icon-btn" aria-label="Share resume">
              <IconShare />
            </a>
            <a href="/" className="hinge-icon-btn" aria-label="Classic site" title="Classic portfolio">
              <IconMore />
            </a>
          </div>
        </div>
      </header>

      <div className="hinge-feed">
        {feed.map((card) =>
          card.kind === 'photo' ? (
            <HingePhotoCard
              key={card.id}
              image={card.image}
              alt={card.alt}
              onHeart={() => openSheet(card.alt)}
            />
          ) : (
            <HingePromptCard
              key={card.id}
              question={card.question}
              answer={card.answer}
              showHeartOnly
              onHeart={() => openSheet(card.question)}
            />
          ),
        )}
      </div>

      <SendLikeSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={sheetTitle}
        github={site.github}
        presetComments={[
          "Let's talk roles for 2026",
          'Impressive — would love to chat',
          'This made me smile',
        ]}
      />
    </div>
  );
}
