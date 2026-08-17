* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
:root {
  --bg: #07090c;
  --bg-soft: #0b0f14;
  --card: #10151b;
  --card-hover: #141a21;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.13);
  --text: #ffffff;
  --muted: #858d98;
  --muted-light: #b7bec8;
  --green: #00d084;
  --green-dark: #00a96b;
  --green-soft: rgba(0, 208, 132, 0.09);
}
body {
  margin: 0;
  min-width: 320px;
  background: var(--bg);
  color: var(--text);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
button,
input,
select,
textarea {
  font: inherit;
}
button {
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
/* =========================
   GLOBAL
========================= */
.app {
  min-height: 100vh;
  background:
    radial-gradient(
      circle at 50% -10%,
      rgba(0, 208, 132, 0.07),
      transparent 35%
    ),
    var(--bg);
}
.primary-button,
.secondary-button,
.search-button,
.clear-button {
  border: 0;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}
.primary-button {
  padding: 11px 17px;
  border-radius: 8px;
  background: var(--green);
  color: #03140d;
  font-size: 12px;
  font-weight: 800;
}
.primary-button:hover {
  transform: translateY(-1px);
  background: #16df93;
}
.primary-button.large {
  padding: 14px 21px;
  font-size: 13px;
}
.primary-button.full {
  width: 100%;
  height: 49px;
}
.secondary-button {
  padding: 10px 15px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #c7ccd3;
  font-size: 12px;
}
.secondary-button:hover {
  background: rgba(255, 255, 255, 0.07);
}
/* =========================
   NAVBAR
========================= */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 72px;
  padding: 0 max(28px, calc((100% - 1180px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  background: rgba(7, 9, 12, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
}
.logo,
.footer-logo {
  font-size: 22px;
  font-weight: 850;
  letter-spacing: -1px;
  white-space: nowrap;
}
.logo span,
.footer-logo span {
  color: var(--green);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;
}
.nav-links a {
  color: #818995;
  font-size: 12px;
  font-weight: 600;
  transition: color 0.2s ease;
}
.nav-links a:hover {
  color: white;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}
.user-email {
  max-width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #646c77;
  font-size: 11px;
}
/* =========================
   HERO
========================= */
.hero {
  position: relative;
  overflow: hidden;
  min-height: 620px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background:
    radial-gradient(
      circle at 75% 45%,
      rgba(0, 208, 132, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(0, 208, 132, 0.04),
      transparent 30%
    );
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px
    );
  background-size: 60px 60px;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    transparent 85%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 90px 0;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 11px;
  border: 1px solid rgba(0, 208, 132, 0.2);
  border-radius: 999px;
  background: rgba(0, 208, 132, 0.06);
  color: var(--green);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
.hero h1 {
  max-width: 780px;
  margin: 22px 0 18px;
  font-size: clamp(54px, 8vw, 92px);
  line-height: 0.92;
  letter-spacing: -5px;
}
.hero h1 span {
  color: var(--green);
}
.hero-content > p {
  max-width: 620px;
  margin: 0;
  color: #8a929d;
  font-size: 16px;
  line-height: 1.7;
}
/* =========================
   SEARCH
========================= */
.search-panel {
  width: min(900px, 100%);
  margin-top: 38px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(13, 17, 22, 0.92);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px rgba(255, 255, 255, 0.03);
}
.search-main {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 0 12px;
  border-radius: 8px;
  background: #090c10;
}
.search-main span {
  color: var(--green);
  font-size: 22px;
}
.search-main input {
  width: 100%;
  height: 46px;
  border: 0;
  outline: 0;
  background: transparent;
  color: white;
  font-size: 13px;
}
.search-main input::placeholder {
  color: #555d67;
}
.search-panel select,
.filter-bar select,
.filter-bar input,
.listing-modal input,
.listing-modal select,
.listing-modal textarea {
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  background: #090c10;
  color: #d9dde2;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.search-panel select {
  height: 46px;
  padding: 0 12px;
}
.search-panel select:focus,
.filter-bar select:focus,
.filter-bar input:focus,
.listing-modal input:focus,
.listing-modal select:focus,
.listing-modal textarea:focus {
  border-color: rgba(0, 208, 132, 0.55);
  box-shadow: 0 0 0 3px rgba(0, 208, 132, 0.07);
}
.search-button {
  min-width: 105px;
  padding: 0 18px;
  border-radius: 8px;
  background: var(--green);
  color: #03140d;
  font-size: 12px;
  font-weight: 800;
}
.search-button:hover {
  background: #16df93;
}
/* =========================
   HERO STATS
========================= */
.hero-stats {
  display: flex;
  gap: 45px;
  margin-top: 35px;
}
.hero-stats div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.hero-stats strong {
  font-size: 19px;
  letter-spacing: -0.5px;
}
.hero-stats span {
  color: #626a75;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
/* =========================
   SECTIONS
========================= */
.properties-section,
.how-section,
.owner-section,
.about-section {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}
.properties-section {
  padding: 100px 0;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 30px;
}
.section-heading.centered {
  display: block;
  text-align: center;
}
.section-label {
  color: var(--green);
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 2px;
}
.section-heading h2,
.how-section h2,
.owner-section h2,
.about-section h2 {
  margin: 10px 0 8px;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1;
  letter-spacing: -2px;
}
.section-heading p,
.how-section .section-heading p {
  margin: 0;
  color: #6e7681;
  font-size: 13px;
  line-height: 1.6;
}
.results-count {
  color: #68717c;
  font-size: 12px;
}
/* =========================
   FILTERS
========================= */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 24px;
}
.filter-bar input,
.filter-bar select {
  height: 42px;
  padding: 0 12px;
  font-size: 12px;
}
.filter-bar input {
  width: 130px;
}
.filter-bar select {
  min-width: 135px;
}
.clear-button {
  padding: 10px 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: #8a929d;
  font-size: 11px;
}
.clear-button:hover {
  color: white;
  border-color: var(--border-strong);
}
/* =========================
   PROPERTY GRID
========================= */
.property-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.property-card {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--card);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
  cursor: pointer;
}
.property-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 208, 132, 0.22);
  background: var(--card-hover);
}
.property-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #0b0e12;
}
.property-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.property-card:hover .property-image {
  transform: scale(1.04);
}
.property-type {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 9px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  background: rgba(5, 7, 9, 0.8);
  color: var(--green);
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}
.property-info {
  padding: 19px;
}
.property-price {
  color: var(--green);
  font-size: 20px;
  font-weight: 850;
  letter-spacing: -0.5px;
}
.property-price small {
  margin-left: 3px;
  color: #69717c;
  font-size: 10px;
  font-weight: 500;
}
.property-info h3 {
  margin: 8px 0;
  font-size: 15px;
  letter-spacing: -0.3px;
}
.property-location {
  margin: 0;
  color: #737c87;
  font-size: 11px;
}
.property-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  padding-top: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #69717c;
  font-size: 10px;
}
.property-details span:last-child {
  color: var(--green);
  font-weight: 700;
}
/* =========================
   EMPTY STATE
========================= */
.empty-state {
  grid-column: 1 / -1;
  padding: 70px 20px;
  text-align: center;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.015);
}
.empty-state h3 {
  margin: 0 0 8px;
}
.empty-state p {
  margin: 0;
  color: #69717c;
  font-size: 13px;
}
/* =========================
   HOW IT WORKS
========================= */
.how-section {
  padding: 105px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 55px;
}
.step {
  padding: 30px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.015);
}
.step-number {
  margin-bottom: 35px;
  color: var(--green);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 1px;
}
.step h3 {
  margin: 0 0 10px;
  font-size: 18px;
}
.step p {
  margin: 0;
  color: #707985;
  font-size: 12px;
  line-height: 1.7;
}
/* =========================
   OWNER CTA
========================= */
.owner-section {
  position: relative;
  overflow: hidden;
  min-height: 400px;
  margin-top: 30px;
  margin-bottom: 100px;
  padding: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  border: 1px solid rgba(0, 208, 132, 0.14);
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 80% 50%,
      rgba(0, 208, 132, 0.12),
      transparent 35%
    ),
    #0b1015;
}
.owner-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}
.owner-content h2 {
  margin-bottom: 18px;
}
.owner-content p {
  max-width: 480px;
  margin: 0 0 25px;
  color: #7a838e;
  font-size: 14px;
  line-height: 1.7;
}
.owner-decoration {
  position: relative;
  width: 320px;
  height: 230px;
}
.owner-decoration::before,
.owner-decoration::after {
  content: "";
  position: absolute;
  border: 1px solid rgba(0, 208, 132, 0.15);
  border-radius: 14px;
  width: 220px;
  height: 150px;
}
.owner-decoration::before {
  top: 0;
  right: 0;
}
.owner-decoration::after {
  bottom: 0;
  left: 0;
}
.decoration-card {
  position: absolute;
  z-index: 2;
  right: 25px;
  bottom: 25px;
  width: 230px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(14, 19, 24, 0.95);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
}
.decoration-card span {
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.decoration-card strong {
  display: block;
  margin: 10px 0 5px;
  font-size: 15px;
}
.decoration-card small {
  color: #707985;
  font-size: 10px;
}
/* =========================
   ABOUT
========================= */
.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  padding: 40px 0 110px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.about-section h2 span {
  color: var(--green);
}
.about-section > p {
  align-self: center;
  margin: 0;
  color: #727b86;
  font-size: 14px;
  line-height: 1.9;
}
/* =========================
   FOOTER
========================= */
footer {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 35px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: #454d58;
  font-size: 10px;
}
footer p {
  margin: 0;
}
.reset-demo {
  border: 0;
  background: transparent;
  color: #343b44;
  font-size: 10px;
}
.reset-demo:hover {
  color: #6c7480;
}
/* =========================
   MODALS
========================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
}
.property-modal,
.listing-modal {
  position: relative;
  width: min(520px, 100%);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: #0d1217;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.55);
}
.property-modal > img {
  width: 100%;
  height: 280px;
  display: block;
  object-fit: cover;
}
.modal-content,
.listing-modal {
  padding: 25px;
}
.property-modal .modal-content {
  padding: 25px;
}
.modal-close {
  position: absolute;
  z-index: 5;
  top: 13px;
  right: 13px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  font-size: 22px;
  line-height: 1;
}
.modal-content h2,
.listing-modal h2 {
  margin: 12px 0 8px;
  font-size: 27px;
  letter-spacing: -1px;
}
.modal-location {
  margin: 0;
  color: #747d88;
  font-size: 12px;
}
.modal-price {
  margin: 22px 0;
  color: var(--green);
  font-size: 28px;
  font-weight: 850;
}
.modal-price small {
  margin-left: 4px;
  color: #6d7580;
  font-size: 11px;
  font-weight: 500;
}
.modal-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 22px;
}
.modal-info span {
  padding: 12px 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  color: #8b949e;
  font-size: 10px;
  text-align: center;
}
.listing-modal > p {
  margin: 0 0 22px;
  color: #747d88;
  font-size: 12px;
  line-height: 1.6;
}
.listing-modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.listing-modal input,
.listing-modal select {
  width: 100%;
  height: 47px;
  padding: 0 13px;
  font-size: 12px;
}
.listing-modal textarea {
  width: 100%;
  min-height: 110px;
  padding: 13px;
  resize: vertical;
  font-size: 12px;
}
/* =========================
   MOBILE
========================= */
@media (max-width: 900px) {
  .navbar {
    padding: 0 20px;
  }
  .nav-links {
    display: none;
  }
  .property-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .search-panel {
    grid-template-columns: 1fr 1fr;
  }
  .search-main {
    grid-column: 1 / -1;
  }
  .search-button {
    height: 46px;
  }
  .owner-section {
    padding: 45px;
  }
  .owner-decoration {
    display: none;
  }
}
@media (max-width: 650px) {
  .navbar {
    height: 64px;
    padding: 0 14px;
  }
  .logo {
    font-size: 20px;
  }
  .user-email,
  .secondary-button {
    display: none;
  }
  .nav-actions {
    margin-left: auto;
  }
  .primary-button {
    padding: 10px 12px;
  }
  .hero {
    min-height: auto;
  }
  .hero-content {
    width: calc(100% - 28px);
    padding: 75px 0 65px;
  }
  .hero h1 {
    font-size: 53px;
    letter-spacing: -3px;
  }
  .hero-content > p {
    font-size: 13px;
  }
  .search-panel {
    grid-template-columns: 1fr;
    padding: 7px;
  }
  .search-main {
    grid-column: auto;
  }
  .search-panel select,
  .search-button {
    width: 100%;
  }
  .hero-stats {
    gap: 25px;
  }
  .hero-stats strong {
    font-size: 16px;
  }
  .properties-section,
  .how-section,
  .owner-section,
  .about-section {
    width: calc(100% - 28px);
  }
  .properties-section,
  .how-section {
    padding: 70px 0;
  }
  .section-heading {
    display: block;
  }
  .results-count {
    margin-top: 15px;
  }
  .filter-bar {
    flex-wrap: wrap;
  }
  .filter-bar input,
  .filter-bar select {
    flex: 1;
    min-width: 120px;
  }
  .property-grid {
    grid-template-columns: 1fr;
  }
  .property-image-wrapper {
    height: 230px;
  }
  .steps {
    grid-template-columns: 1fr;
    margin-top: 35px;
  }
  .owner-section {
    margin-top: 0;
    margin-bottom: 70px;
    padding: 40px 25px;
  }
  .about-section {
    grid-template-columns: 1fr;
    gap: 30px;
    padding-bottom: 70px;
  }
  footer {
    width: calc(100% - 28px);
    flex-direction: column;
    padding: 30px 0;
    text-align: center;
  }
  .property-modal > img {
    height: 210px;
  }
  .modal-info {
    grid-template-columns: 1fr;
  }
  .modal-content,
  .listing-modal {
    padding: 20px;
  }
}
@media (max-width: 380px) {
  .hero h1 {
    font-size: 45px;
  }
  .hero-stats {
    gap: 16px;
  }
  .hero-stats span {
    font-size: 8px;
  }
}
