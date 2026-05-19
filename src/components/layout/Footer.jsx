import { site } from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <p>{site.footerQuip}</p>
      <p className="footer-copy">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
