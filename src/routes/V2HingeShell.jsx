import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HingeBottomNav from '../components/v2/HingeBottomNav';
import HingeOnboarding from '../components/v2/HingeOnboarding';
import '../styles/hinge.css';

const TITLES = {
  '/v2': 'Arnav — Hinge',
  '/v2/experience': 'Experience — Arnav',
  '/v2/projects': 'Projects — Arnav',
  '/v2/education': 'Education — Arnav',
  '/v2/contact': 'Contact — Arnav',
};

export default function V2HingeShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] || 'Arnav — Hinge';
    document.documentElement.style.background = '#ebebeb';
    return () => {
      document.documentElement.style.background = '';
    };
  }, [pathname]);

  return (
    <div className="hinge-app">
      <div className="hinge-phone">
        <Outlet />
        <HingeBottomNav />
        <HingeOnboarding />
      </div>
    </div>
  );
}
