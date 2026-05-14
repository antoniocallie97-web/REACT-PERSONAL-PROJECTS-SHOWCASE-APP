const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
 
  :root {
    --bg:    #020b18;
    --blue1: #0369a1;
    --blue2: #0ea5e9;
    --ice:   #bae6fd;
    --white: #f0f9ff;
    --glow:  rgba(14,165,233,0.25);
  }
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
 
  #star-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
 
  .sp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.1rem 3.5rem;
    background: rgba(2,11,24,0.7);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(14,165,233,0.12);
  }
  .sp-logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
    cursor: pointer;                /* clicking logo goes back to home */
  }
  .sp-logo span { color: var(--blue2); }
  .sp-links { display: flex; gap: 2rem; list-style: none; }
 
  /* Nav link styled as a button so it sits inside <li> cleanly */
  .sp-links button {
    background: none; border: none; padding: 0;
    color: var(--ice); font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; opacity: 0.8; cursor: pointer;
    transition: opacity 0.2s;
  }
  .sp-links button:hover { opacity: 1; }
 
  .sp-btn {
    background: var(--blue2); color: #fff; border: none; border-radius: 8px;
    padding: 0.5rem 1.3rem; font-size: 0.88rem; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: transform 0.15s;
  }
  .sp-btn:hover { transform: translateY(-1px); }
 
  .sp-hero {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 7rem 2rem 4rem;
  }
  .sp-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border: 1px solid rgba(14,165,233,0.3);
    border-radius: 100px;
    padding: 0.3rem 1rem;
    font-size: 0.78rem; color: var(--blue2); font-weight: 500;
    margin-bottom: 1.8rem;
    animation: up 0.7s ease both;
    background: rgba(14,165,233,0.06);
  }
  .sp-tag-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--blue2);
    animation: blink 1.5s infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.2; }
  }
  .sp-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 6vw, 5rem);
    font-weight: 800; line-height: 1.08; letter-spacing: -0.03em;
    animation: up 0.7s 0.1s ease both;
  }
  .sp-hero h1 em { font-style: normal; color: var(--blue2); }
  .sp-sub {
    max-width: 500px;
    margin: 1.4rem auto 0;
    font-size: 1rem; line-height: 1.75;
    color: var(--ice); font-weight: 300; opacity: 0.85;
    animation: up 0.7s 0.2s ease both;
  }
  .sp-btns {
    display: flex; gap: 1rem;
    margin-top: 2.5rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: up 0.7s 0.3s ease both;
  }
  .btn-a {
    background: var(--blue2); color: #fff; border: none; border-radius: 10px;
    padding: 0.85rem 2rem; font-size: 0.95rem; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 0 24px var(--glow);
    transition: transform 0.15s;
  }
  .btn-a:hover { transform: translateY(-2px); }
  .btn-b {
    background: transparent; color: var(--ice);
    border: 1px solid rgba(186,230,253,0.25);
    border-radius: 10px;
    padding: 0.85rem 2rem; font-size: 0.95rem; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, transform 0.15s;
  }
  .btn-b:hover { border-color: var(--blue2); transform: translateY(-2px); }
 
  .sp-cta {
    position: relative; z-index: 1;
    text-align: center; padding: 6rem 2rem;
    background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(14,165,233,0.15) 0%, transparent 70%);
  }
  .sp-cta h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.8rem;
  }
  .sp-cta p { color: var(--ice); opacity: 0.8; margin-bottom: 2rem; font-weight: 300; }
 
  .sp-footer {
    position: relative; z-index: 1;
    border-top: 1px solid rgba(14,165,233,0.1);
    padding: 1.8rem 3.5rem;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
  }
  .sp-footer-copy { font-size: 0.8rem; color: rgba(186,230,253,0.4); }
  .sp-footer-links { display: flex; gap: 1.5rem; list-style: none; }
  .sp-footer-links button {
    background: none; border: none; padding: 0;
    font-size: 0.8rem; color: rgba(186,230,253,0.4);
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }
  .sp-footer-links button:hover { color: var(--ice); }
 
  @keyframes up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  @media (max-width: 768px) {
    .sp-nav { padding: 1rem 1.5rem; }
    .sp-links { display: none; }
    .sp-footer { padding: 1.5rem; flex-direction: column; text-align: center; }
  }
`;
 