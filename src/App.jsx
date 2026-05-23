import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const V1Portfolio = lazy(() => import('./routes/V1Portfolio'));
const V2HingeShell = lazy(() => import('./routes/V2HingeShell'));
const ProfileTab = lazy(() => import('./routes/v2/ProfileTab'));
const EducationTab = lazy(() => import('./routes/v2/EducationTab'));
const ExperienceTab = lazy(() => import('./routes/v2/ExperienceTab'));
const ProjectsTab = lazy(() => import('./routes/v2/ProjectsTab'));
const ContactTab = lazy(() => import('./routes/v2/ContactTab'));

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050508',
        color: '#f5f5f7',
      }}
    >
      Loading…
    </div>
  );
}

function V2Fallback() {
  return (
    <div
      className="hinge-app"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
      }}
    >
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<V1Portfolio />} />
          <Route
            path="/v2"
            element={
              <Suspense fallback={<V2Fallback />}>
                <V2HingeShell />
              </Suspense>
            }
          >
            <Route index element={<ProfileTab />} />
            <Route path="education" element={<EducationTab />} />
            <Route path="experience" element={<ExperienceTab />} />
            <Route path="projects" element={<ProjectsTab />} />
            <Route path="contact" element={<ContactTab />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
