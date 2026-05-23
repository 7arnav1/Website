import { site } from '../../data/site';
import arnavPhoto from '../../Arnav.jpg';
import { IconBolt } from '../../components/v2/HingeIcons';

export default function ContactTab() {
  return (
    <div className="hinge-scroll hinge-contact-scroll">
      <div className="hinge-page-header">
        <h1 className="hinge-page-title">Likes You</h1>
        <a href={site.resume} className="hinge-boost-pill">
          <IconBolt />
          Boost
        </a>
      </div>

      <div className="hinge-filters" style={{ paddingTop: 0 }}>
        <span className="hinge-filter-pill hinge-filter-pill--active">Recent</span>
        <span className="hinge-filter-pill">Expires soon</span>
        <span className="hinge-filter-pill">Expired</span>
      </div>

      <div className="hinge-like-card">
        <span className="hinge-like-tag">Liked your photo</span>
        <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 700 }}>{site.name}</h2>
        <img src={arnavPhoto} alt="" className="hinge-like-photo" />
      </div>

      <div className="hinge-rows" style={{ paddingTop: 0 }}>
        <a href={`mailto:${site.email}`} className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--teal">✉️</div>
          <div>
            <p className="hinge-row-title">Email</p>
            <p className="hinge-row-desc">{site.email}</p>
          </div>
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--purple">in</div>
          <div>
            <p className="hinge-row-title">LinkedIn</p>
            <p className="hinge-row-desc">Connect professionally</p>
          </div>
        </a>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--rose">⌥</div>
          <div>
            <p className="hinge-row-title">GitHub</p>
            <p className="hinge-row-desc">github.com/7arnav1</p>
          </div>
        </a>
        <a href="/" className="hinge-row">
          <div className="hinge-row-icon hinge-row-icon--purple">✦</div>
          <div>
            <p className="hinge-row-title">Classic portfolio</p>
            <p className="hinge-row-desc">Universe mode at arnavs.tech</p>
          </div>
        </a>
      </div>

      <div className="hinge-upgrade-bar">
        <a href={site.resume} className="hinge-upgrade-btn">
          Upgrade
        </a>
        <p className="hinge-upgrade-text">Subscribe to see everyone who likes you → jk, download my resume</p>
      </div>
    </div>
  );
}
