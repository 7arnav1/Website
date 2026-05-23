import { NavLink, useLocation } from 'react-router-dom';
import { IconHingeH, IconStar, IconHeart, IconChat } from './HingeIcons';
import arnavPhoto from '../../Arnav.jpg';

/** Hinge icon positions: H → Profile, Star → Experience, Heart → Projects, Chat → Education, Avatar → Contact */
const tabs = [
  { to: '/v2', end: true, label: 'Profile', slot: 'h' },
  { to: '/v2/experience', end: false, label: 'Experience', slot: 'star' },
  { to: '/v2/projects', end: false, label: 'Projects', slot: 'heart', badge: '4' },
  { to: '/v2/education', end: false, label: 'Education', slot: 'chat', badge: '1' },
  { to: '/v2/contact', end: false, label: 'Contact', slot: 'avatar' },
];

export default function HingeBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="hinge-bottom-nav" aria-label="Portfolio">
      {tabs.map((tab) => {
        const active = tab.end ? pathname === '/v2' || pathname === '/v2/' : pathname === tab.to;

        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={`hinge-nav-item ${active ? 'hinge-nav-item--active' : ''}`}
            aria-label={tab.label}
            title={tab.label}
            data-hinge-nav={tab.slot}
          >
            <span className="hinge-nav-icon-wrap">
              {tab.slot === 'h' && <IconHingeH active={active} />}
              {tab.slot === 'star' && <IconStar active={active} />}
              {tab.slot === 'heart' && <IconHeart size={24} filled={active} />}
              {tab.slot === 'chat' && <IconChat active={active} />}
              {tab.slot === 'avatar' && (
                <img
                  src={arnavPhoto}
                  alt=""
                  className={`hinge-nav-avatar ${active ? 'hinge-nav-avatar--active' : ''}`}
                />
              )}
              {tab.badge && <span className="hinge-nav-badge">{tab.badge}</span>}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
