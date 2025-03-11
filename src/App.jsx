import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Environment } from '@react-three/drei';
import * as THREE from 'three';
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import myPhoto from './arnav.jpg';     // Square image
import linkedInLogo from './logo.png'; // LinkedIn icon
import githubLogo from './logo1.png';  // GitHub icon
import './index.css';

/** =============== Floating 3D Text =============== **/
function FloatingText({ textMeshRef }) {
  useEffect(() => {
    if (!textMeshRef.current) return;
    // Slight back-and-forth rotation
    gsap.to(textMeshRef.current.rotation, {
      y: Math.PI / 14,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }, [textMeshRef]);

  return (
    <Text3D
      ref={textMeshRef}
      font={helvetikerFont}
      position={[-7.5, 0, 0]} // Moved left for more "left-aligned" feel
      size={1.2}
      height={0.3}
      curveSegments={32}
      bevelEnabled
      bevelThickness={0.05}
      bevelSize={0.02}
    >
      Welcome, It's Arnav!
      <meshStandardMaterial
        attach="material"
        transparent
        /* Metallic purple gradient */
        color={new THREE.Color('#e600ff').lerp(new THREE.Color('#c200ff'), 0.6)}
        metalness={1}
        roughness={0}
        /* Slight emissive so it's never fully black */
        emissive="#551155"
        emissiveIntensity={0.3}
      />
    </Text3D>
  );
}

/** =============== Floating Stars =============== **/
function FloatingStars() {
  const starsRef = useRef();
  const speeds = useRef(Array.from({ length: 8000 }, () => Math.random() * 0.0005 + 0.0001));

  useFrame(({ clock }) => {
    if (!starsRef.current) return;
    const time = clock.getElapsedTime();
    const positions = starsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < 8000; i++) {
      positions[i * 3]     += Math.sin(time * speeds.current[i]) * 0.002; // x
      positions[i * 3 + 1] += Math.cos(time * speeds.current[i]) * 0.002; // y
      positions[i * 3 + 2] += Math.sin(time * speeds.current[i]) * 0.002; // z
    }
    starsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Stars
      ref={starsRef}
      radius={250}
      depth={80}
      count={8000}
      factor={10}
      saturation={1}
      fade
      speed={0.2}
    />
  );
}

/** =============== Main Portfolio =============== **/
function Portfolio() {
  const heroRef = useRef(null);
  const textMeshRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the hero for the first screen
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      pin: '.hero',
      pinSpacing: false,
    });

    // Access the child mesh from <Text3D>
    const text3DObj = textMeshRef.current;
    if (!text3DObj) return;
    const mesh = text3DObj.children && text3DObj.children[0];
    if (!mesh || !mesh.material) return;

    // Fade out text on scroll
    gsap.to(mesh.material, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="portfolio">
      {/* ===== Hero Section (pinned) ===== */}
      <section className="hero" ref={heroRef}>
        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 7] }}>
            {/* Lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[0, 0, 10]} intensity={2} color="#ffffff" />
            <Environment preset="city" />

            {/* Star field + rotating text */}
            <FloatingStars />
            <FloatingText textMeshRef={textMeshRef} />

            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
      </section>

      {/* ===== About Section (square image) ===== */}
      <section className="about-section">
        <h2>About Me</h2>
        <img
          src={myPhoto}
          alt="Arnav"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover', // square image
            marginBottom: '1rem',
          }}
        />
        <p>
          I'm Arnav, a passionate developer pushing the boundaries
          of creativity and technology. Welcome to my portfolio!
        </p>
      </section>

      {/* Key Strengths as 3 "cards" with bullet points */}
      <section className="skills-section">
        <h2>Key Strengths</h2>
        <div className="cards-container">
          {/* 1) Strong Computer Science Background */}
          <div className="card">
            <h3>Strong CS Background</h3>
            <ul style={{ textAlign: 'left' }}>
              <li>In-depth knowledge of multiple programming languages (Java, Python, C++, etc.)</li>
              <li>Tutored CS, reinforcing core concepts and fundamentals</li>
              <li>Developed real-world solutions in various environments (backend, system-level, etc.)</li>
            </ul>
          </div>

          {/* 2) Leadership in Collaborative Settings */}
          <div className="card">
            <h3>Leadership</h3>
            <ul style={{ textAlign: 'left' }}>
              <li>Executive team member(President elect) at YesUW, organizing events for hundreds, encouraging people to go outisde thier comfort zones and connect with strangers.</li>
              <li>Building Manager at Wisconsin Union,Oversee daily operations, ensuring smooth functionality and adherence to safety protocols.-Gained valuable experience in team management, problem-solving, and decision-making, c</li>
            </ul>
          </div>

          {/* 3) Multi-Functional Requirements */}
          <div className="card">
            <h3>Teaching & Mentorship</h3>
            <ul style={{ textAlign: 'left' }}>
              <li>Guided 500+ students in foundational AI (search algorithms, optimization, reinforcement learning) through 1-on-1 and group sessions.</li>
              <li>Improved success rates by offering detailed feedback on large-scale programming projects and clarifying advanced concepts.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Current Projects (3 cards) */}
      <section className="current-project-section">
        <h2>Current Projects</h2>
        <div className="cards-container">
          {/* 1) Home Services app */}
          <div className="card">
            <h3>Home Services App (TBA)</h3>
            <p>Project in progress—details forthcoming.</p>
          </div>

          {/* 2) AIvestor */}
          <div className="card">
            <h3>AIvestor</h3>
            <ul style={{ textAlign: 'left' }}>
              <li>
                Developing a reinforcement learning model to optimize portfolio
                allocation by maximizing returns and minimizing risks.
              </li>
              <li>
                Implemented Proximal Policy Optimization, leveraging Yahoo Finance
                to train the RL agent on historical data.
              </li>
              <li>
                Creating an interactive dashboard using Matplotlib and Plotly
                to visualize portfolio performance and allocation trends.
              </li>
            </ul>
          </div>

          {/* 3) Sponta */}
          <div className="card">
            <h3>Sponta</h3>
            <p>An app that encourages users to seek discomfort and embrace spontaneity.</p>
          </div>
        </div>
      </section>

      {/* Past Projects */}
      <section className="projects-section">
        <h2>Past Projects</h2>
        <p>
          Check out my GitHub to see some of my past work:
          <br />
          {/* GitHub icon + link */}
          <img
            src={githubLogo}
            alt="GitHub"
            style={{ width: '50px', marginRight: '8px' }}
          />
          <a
            href="https://github.com/7arnav1"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#ff66ff' }}
          >
            github.com/7arnav1
          </a>
        </p>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <h2>Connect With Me</h2>
        <p>
          Feel free to connect with me on LinkedIn:
          <br />
          {/* LinkedIn icon + link */}
          <img
            src={linkedInLogo}
            alt="LinkedIn"
            style={{ width: '50px', marginRight: '8px', verticalAlign: 'middle' }}
          />
          <a
            href="https://www.linkedin.com/in/arnav-srivastav/"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#66ff66' }}
          >
            linkedin.com/in/arnav-srivastav
          </a>
        </p>
      </section>
    </div>
  );
}

export default Portfolio;
