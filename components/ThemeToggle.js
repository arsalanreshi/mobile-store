import { useContext } from "react";
import { ThemeContext } from "../pages/_app";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
      <div className="theme-icon">
        <div className={`sun ${theme === 'dark' ? 'visible' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={`moon ${theme === 'light' ? 'visible' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .theme-toggle {
          position: relative;
          background: var(--bg-secondary);
          border: 2px solid var(--border-primary);
          border-radius: 2rem;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 60px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .theme-toggle:hover {
          border-color: var(--brand-primary);
          transform: scale(1.05);
        }
        
        .theme-icon {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .sun, .moon {
          position: absolute;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: scale(0) rotate(180deg);
          color: var(--text-primary);
        }
        
        .sun svg, .moon svg {
          display: block;
        }
        
        .sun.visible, .moon.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        
        .sun {
          animation: ${theme === 'dark' ? 'sunRise 0.4s ease-out' : 'none'};
        }
        
        .moon {
          animation: ${theme === 'light' ? 'moonRise 0.4s ease-out' : 'none'};
        }
        
        @keyframes sunRise {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-90deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes moonRise {
          0% {
            opacity: 0;
            transform: scale(0) rotate(90deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </button>
  );
}
