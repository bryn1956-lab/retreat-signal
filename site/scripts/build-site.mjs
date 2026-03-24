import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const venues = JSON.parse(fs.readFileSync(path.join(srcDir, 'generated', 'venues.json'), 'utf8'));

const brandName = 'Retreat Signal';
const brandTagline = 'Curated executive retreat venues for leadership teams in the Western U.S.';
const states = [...new Set(venues.map((venue) => venue.state))].sort();
const useCases = [...new Set(venues.flatMap((venue) => venue.idealFor))].sort();
const stateNameMap = {
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  OR: 'Oregon',
  UT: 'Utah',
  WA: 'Washington'
};

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'venues'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'states'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'browse'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'services'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'guides'), { recursive: true });

const styles = `
:root{--bg:#0b1020;--panel:#121933;--panel2:#0f1530;--text:#eef2ff;--muted:#aab6d3;--accent:#7dd3fc;--line:#24304f;--good:#86efac}
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:linear-gradient(180deg,#0b1020,#0f172a);color:var(--text)}a{color:var(--accent);text-decoration:none}
.container{max-width:1120px;margin:0 auto;padding:24px}.hero{padding:56px 0 24px}.eyebrow{color:var(--accent);text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.hero h1{font-size:46px;line-height:1.04;margin:10px 0 16px;max-width:920px}.hero p{max-width:780px;color:var(--muted);font-size:18px;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}.card{background:rgba(18,25,51,.92);border:1px solid var(--line);border-radius:18px;padding:20px}.card h3{margin:0 0 10px;font-size:22px}.meta{color:var(--muted);font-size:14px;margin-bottom:10px}.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:6px 10px;font-size:12px;color:var(--muted);margin:0 8px 8px 0}.section{padding:20px 0 36px}.section h2{font-size:28px;margin:0 0 10px}.section p{color:var(--muted)}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0}.stat{background:rgba(18,25,51,.92);border:1px solid var(--line);border-radius:16px;padding:16px}.stat .n{font-size:28px;font-weight:800}.stat .l{font-size:13px;color:var(--muted)}.detail{max-width:860px}.detail h1{font-size:42px;margin-bottom:8px}.detail p,.detail li{color:var(--muted);line-height:1.6}.footer{padding:30px 0 60px;color:var(--muted);font-size:14px}.nav{display:flex;gap:14px;flex-wrap:wrap;margin:0 0 14px}.nav a{color:var(--text)}.brand{display:flex;flex-direction:column;margin-bottom:16px}.brand-name{font-size:18px;font-weight:800;letter-spacing:.04em}.brand-tag{font-size:13px;color:var(--muted)}.callout{background:linear-gradient(180deg,rgba(125,211,252,.08),rgba(125,211,252,.02));border:1px solid var(--line);border-radius:18px;padding:20px}.split{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}.list{padding-left:18px}.feature{border-left:3px solid var(--accent);padding-left:14px;margin:14px 0}.browse-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}.browse-card{background:rgba(15,21,48,.92);border:1px solid var(--line);border-radius:16px;padding:18px}.browse-card h3{margin:0 0 8px;font-size:20px}.small{font-size:14px;color:var(--muted)}.cta-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.cta{background:linear-gradient(180deg,rgba(134,239,172,.08),rgba(125,211,252,.04));border:1px solid var(--line);border-radius:18px;padding:22px}.cta h3{margin-top:0}.button{display:inline-block;background:var(--accent);color:#07111f!important;padding:12px 16px;border-radius:12px;font-weight:700;margin-top:10px}.button.secondary{background:transparent;color:var(--text)!important;border:1px solid var(--line)}.formbox{background:rgba(18,25,51,.92);border:1px solid var(--line);border-radius:18px;padding:20px}.formbox label{display:block;font-size:14px;color:var(--muted);margin:14px 0 6px}.formbox input,.formbox textarea,.formbox select{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0d1430;color:var(--text)}.formbox textarea{min-height:120px;resize:vertical}@media(max-width:860px){.split{grid-template-columns:1fr}.hero h1,.detail h1{font-size:36px}.stats{grid-template-columns:repeat(2,1fr)}}
`;

const layout = (title, body) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${brandTagline}"><style>${styles}</style></head><body>${body}</body></html>`;

const labelize = (value) => value.replaceAll('_', ' ');
const stateLabel = (state) => stateNameMap[state] || state;
const stateSlug = (state) => state.toLowerCase();

const venueCard = (venue) => `
  <article class="card">
    <div class="meta">${venue.city}, ${venue.state} · ${venue.verificationStatus}</div>
    <h3><a href="/venues/${venue.slug}.html">${venue.name}</a></h3>
    <p>${venue.summary}</p>
    <div>
      ${venue.idealFor.map((i) => `<span class="pill">${labelize(i)}</span>`).join('')}
    </div>
  </article>
`;

const brandBlock = `
  <div class="brand">
    <div class="brand-name">${brandName}</div>
    <div class="brand-tag">${brandTagline}</div>
  </div>
`;

const pageShellTop = `
  <main class="container">
    ${brandBlock}
    <nav class="nav">
      <a href="/index.html">Home</a>
      <a href="/browse/index.html">Browse</a>
      <a href="/guides/index.html">Guides</a>
      <a href="/services/shortlist-request.html">Request shortlist</a>
      <a href="/services/feature-your-venue.html">Feature your venue</a>
      <a href="/services/concierge.html">Concierge</a>
      ${states.map((state) => `<a href="/states/${stateSlug(state)}.html">${state}</a>`).join('')}
    </nav>
`;

const pageShellBottom = `
    <div class="footer">${brandName} is an early build. Verified inventory only. Search-verified venues remain outside the publishable set for now.</div>
  </main>
`;

const featuredVenues = venues.slice(0, 3);
const homeBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Western U.S. executive retreat directory</div>
      <h1>High-signal executive retreat venues, minus the generic travel clutter.</h1>
      <p>${brandName} is for founders, chiefs of staff, executive assistants, and leadership teams planning offsites in the Western U.S. We prioritize verified venue inventory, practical meeting details, and shortlist-worthy options for strategy retreats, board gatherings, and leadership sessions.</p>
      <div class="stats">
        <div class="stat"><div class="n">${venues.length}</div><div class="l">verified venues</div></div>
        <div class="stat"><div class="n">${states.length}</div><div class="l">states covered</div></div>
        <div class="stat"><div class="n">${useCases.length}</div><div class="l">browseable use cases</div></div>
        <div class="stat"><div class="n">Signal over noise</div><div class="l">curation standard</div></div>
      </div>
    </section>

    <section class="section split">
      <div class="callout">
        <h2>What makes this different</h2>
        <div class="feature"><strong>Verified inventory first.</strong><p>Only directly verified venues are included in the publishable base.</p></div>
        <div class="feature"><strong>Executive fit over generic travel content.</strong><p>We focus on privacy, boardroom suitability, leadership offsite value, and logistical practicality.</p></div>
        <div class="feature"><strong>Built to become a service business.</strong><p>Directory traffic can convert into shortlists, concierge help, and venue-side monetization.</p></div>
      </div>
      <div class="card">
        <h2>Browse fast</h2>
        <p class="small">Start by state or retreat type.</p>
        <div>
          ${states.map((state) => `<span class="pill"><a href="/states/${stateSlug(state)}.html">${stateLabel(state)}</a></span>`).join('')}
        </div>
        <div style="margin-top:12px">
          ${useCases.map((useCase) => `<span class="pill"><a href="/browse/index.html#${useCase}">${labelize(useCase)}</a></span>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Services</h2>
      <div class="cta-grid">
        <div class="cta"><h3>Request a shortlist</h3><p>Tell us your team size, region, and retreat goals. We’ll turn the directory into a tighter working set.</p><a class="button" href="/services/shortlist-request.html">Request shortlist</a></div>
        <div class="cta"><h3>Concierge matching</h3><p>For teams that want help moving faster from venue discovery to a tighter decision set.</p><a class="button secondary" href="/services/concierge.html">See concierge</a></div>
        <div class="cta"><h3>Feature your venue</h3><p>Venue operators can request review for inclusion and future premium placement.</p><a class="button secondary" href="/services/feature-your-venue.html">Feature your venue</a></div>
      </div>
    </section>

    <section class="section">
      <h2>Featured venues</h2>
      <p>High-signal options with strong executive-offsite fit and usable planner details.</p>
      <div class="grid">${featuredVenues.map(venueCard).join('')}</div>
    </section>

    <section class="section">
      <h2>Browse by state</h2>
      <div class="browse-grid">
        ${states.map((state) => {
          const count = venues.filter((venue) => venue.state === state).length;
          return `<div class="browse-card"><h3><a href="/states/${stateSlug(state)}.html">${stateLabel(state)}</a></h3><div class="small">${count} verified venues</div></div>`;
        }).join('')}
      </div>
    </section>

    <section class="section">
      <h2>Guides</h2>
      <div class="browse-grid">
        <div class="browse-card"><h3><a href="/guides/index.html">Planning guides</a></h3><div class="small">Early SEO and trust-building content.</div></div>
        <div class="browse-card"><h3><a href="/guides/executive-retreat-venues-western-us.html">Executive retreat venues in the Western U.S.</a></h3><div class="small">Core keyword-focused landing page.</div></div>
        <div class="browse-card"><h3><a href="/guides/board-meeting-venues-western-us.html">Board meeting venues in the Western U.S.</a></h3><div class="small">Higher-intent executive use case page.</div></div>
      </div>
    </section>

    <section class="section">
      <h2>Full verified directory</h2>
      <p>Initial launch inventory built from directly verified venue pages.</p>
      <div class="grid">${venues.map(venueCard).join('')}</div>
    </section>
  ${pageShellBottom}
`;

fs.writeFileSync(path.join(distDir, 'index.html'), layout(brandName, homeBody));

const browseBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Browse the directory</div>
      <h1>Browse executive retreat venues by state and use case.</h1>
      <p>Use this page to move quickly from general exploration to a tighter shortlist.</p>
    </section>

    <section class="section">
      <h2>By state</h2>
      <div class="browse-grid">
        ${states.map((state) => {
          const stateVenues = venues.filter((venue) => venue.state === state);
          return `<div class="browse-card"><h3><a href="/states/${stateSlug(state)}.html">${stateLabel(state)}</a></h3><div class="small">${stateVenues.length} verified venues</div><p class="small">${stateVenues.map((v) => v.name).slice(0, 3).join(' · ')}</p></div>`;
        }).join('')}
      </div>
    </section>

    <section class="section">
      <h2>By use case</h2>
      <div class="grid">
        ${useCases.map((useCase) => {
          const matching = venues.filter((venue) => venue.idealFor.includes(useCase));
          return `<div class="card" id="${useCase}"><h3>${labelize(useCase)}</h3><p>${matching.length} venues currently tagged for this use case.</p><div>${matching.map((venue) => `<span class="pill"><a href="/venues/${venue.slug}.html">${venue.name}</a></span>`).join('')}</div></div>`;
        }).join('')}
      </div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'browse', 'index.html'), layout(`Browse | ${brandName}`, browseBody));

for (const state of states) {
  const stateVenues = venues.filter((venue) => venue.state === state);
  const body = `
    ${pageShellTop}
      <section class="hero">
        <div class="eyebrow">${stateLabel(state)}</div>
        <h1>Executive retreat venues in ${stateLabel(state)}</h1>
        <p>Verified venues in ${stateLabel(state)} for leadership offsites, board meetings, strategy retreats, and executive gatherings.</p>
      </section>
      <section class="section">
        <h2>${stateVenues.length} verified venues</h2>
        <div class="grid">${stateVenues.map(venueCard).join('')}</div>
      </section>
    ${pageShellBottom}
  `;
  fs.writeFileSync(path.join(distDir, 'states', `${stateSlug(state)}.html`), layout(`${stateLabel(state)} Executive Retreat Venues | ${brandName}`, body));
}

const shortlistBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Shortlist request</div>
      <h1>Get a tighter retreat shortlist.</h1>
      <p>Use this if you want help narrowing the current inventory into a tighter working set based on team size, region, logistics, and meeting style.</p>
    </section>
    <section class="section split">
      <div class="formbox">
        <h2>Shortlist intake</h2>
        <label>Company / team</label><input placeholder="Your company or team name">
        <label>Team size</label><input placeholder="e.g. 8, 15, 30">
        <label>Preferred states / region</label><input placeholder="e.g. Arizona, California, Pacific Northwest">
        <label>Primary retreat type</label><select><option>Executive retreat</option><option>Leadership offsite</option><option>Board meeting</option><option>Remote team offsite</option></select>
        <label>Notes</label><textarea placeholder="Budget, airport preferences, buyout needs, meeting style, dates, etc."></textarea>
        <p class="small">Current version is a static intake mockup. In production, this would route to email, CRM, or a form backend.</p>
      </div>
      <div class="card">
        <h2>What you’d get</h2>
        <ul class="list">
          <li>3–7 venue shortlist options</li>
          <li>Why each venue fits</li>
          <li>Tradeoffs around logistics, scale, and executive fit</li>
          <li>Faster internal decision-making</li>
        </ul>
      </div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'shortlist-request.html'), layout(`Request a shortlist | ${brandName}`, shortlistBody));

const conciergeBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Concierge matching</div>
      <h1>Concierge support for retreat planning teams.</h1>
      <p>This is the future service layer on top of the directory: turning venue discovery into a faster shortlisting and matching process for teams that do not want to research from scratch.</p>
    </section>
    <section class="section grid">
      <div class="card"><h3>Who it is for</h3><p>Founders, chiefs of staff, executive assistants, and operators who need a practical starting set fast.</p></div>
      <div class="card"><h3>What it covers</h3><p>Venue recommendations, fit notes, decision support, and eventually outreach / inquiry routing.</p></div>
      <div class="card"><h3>Why it matters</h3><p>The directory creates attention. Concierge is the higher-value service layer.</p></div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'concierge.html'), layout(`Concierge | ${brandName}`, conciergeBody));

const featureBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Feature your venue</div>
      <h1>Request inclusion or future premium placement.</h1>
      <p>This page is for venue operators who want to be reviewed for inclusion in the directory and, later, premium visibility.</p>
    </section>
    <section class="section split">
      <div class="formbox">
        <h2>Venue submission</h2>
        <label>Venue name</label><input placeholder="Venue name">
        <label>Website</label><input placeholder="https://...">
        <label>Location</label><input placeholder="City, State">
        <label>Why your venue fits</label><textarea placeholder="Meeting space, lodging, executive fit, buyout options, airport access, etc."></textarea>
        <p class="small">Current version is static. In production, this would route to a review queue and outreach workflow.</p>
      </div>
      <div class="card">
        <h2>Review criteria</h2>
        <ul class="list">
          <li>Executive or leadership retreat relevance</li>
          <li>Lodging + meeting capability</li>
          <li>Clear planner-useful details</li>
          <li>Strong fit for Western U.S. inventory focus</li>
        </ul>
      </div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'feature-your-venue.html'), layout(`Feature your venue | ${brandName}`, featureBody));

const guidesIndexBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Planning guides</div>
      <h1>Executive retreat planning guides.</h1>
      <p>Early SEO and trust-building content designed to support the directory and capture intent-driven search queries.</p>
    </section>
    <section class="section browse-grid">
      <div class="browse-card"><h3><a href="/guides/executive-retreat-venues-western-us.html">Executive retreat venues in the Western U.S.</a></h3><div class="small">Core broad-intent page tied directly to directory inventory.</div></div>
      <div class="browse-card"><h3><a href="/guides/board-meeting-venues-western-us.html">Board meeting venues in the Western U.S.</a></h3><div class="small">High-intent page for tighter executive use cases.</div></div>
      <div class="browse-card"><h3><a href="/guides/how-to-choose-an-executive-retreat-venue.html">How to choose an executive retreat venue</a></h3><div class="small">Trust-building planning article for shortlist-minded buyers.</div></div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'index.html'), layout(`Guides | ${brandName}`, guidesIndexBody));

const westernGuideBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Guide</div>
      <h1>Executive retreat venues in the Western U.S.</h1>
      <p>If you are planning a leadership retreat in the Western U.S., the goal is not just finding a beautiful venue. The real goal is finding a venue that supports executive work: privacy, meeting readiness, lodging, access, and the right atmosphere for decision-making.</p>
    </section>
    <section class="section split">
      <div class="card"><h2>What matters most</h2><ul class="list"><li>lodging on site</li><li>meeting spaces that do not feel generic</li><li>airport or drive-time practicality</li><li>privacy and executive fit</li><li>clear differentiation between board-style and larger offsite needs</li></ul></div>
      <div class="card"><h2>Current verified inventory</h2><p>${venues.length} verified venues across ${states.length} Western states.</p><a class="button" href="/browse/index.html">Browse directory</a></div>
    </section>
    <section class="section"><h2>Verified venues</h2><div class="grid">${venues.map(venueCard).join('')}</div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'executive-retreat-venues-western-us.html'), layout(`Executive retreat venues in the Western U.S. | ${brandName}`, westernGuideBody));

const boardVenues = venues.filter((venue) => venue.idealFor.includes('board_meeting'));
const boardGuideBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Guide</div>
      <h1>Board meeting venues in the Western U.S.</h1>
      <p>Board meeting venues need a different bar than generic offsite properties. Tight logistics, privacy, serious meeting rooms, and a setting that supports high-quality discussion matter more than novelty.</p>
    </section>
    <section class="section"><h2>What to prioritize</h2><div class="grid"><div class="card"><h3>Boardroom suitability</h3><p>Look for dedicated boardrooms, smaller executive rooms, or flexible spaces that can support confidential sessions.</p></div><div class="card"><h3>Access</h3><p>For board members flying in, airport proximity and straightforward routing matter more than gimmicks.</p></div><div class="card"><h3>Privacy</h3><p>Board gatherings generally benefit from lower-noise properties with strong service and controlled logistics.</p></div></div></section>
    <section class="section"><h2>Current board-meeting tagged venues</h2><div class="grid">${boardVenues.map(venueCard).join('')}</div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'board-meeting-venues-western-us.html'), layout(`Board meeting venues in the Western U.S. | ${brandName}`, boardGuideBody));

const chooseGuideBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Guide</div>
      <h1>How to choose an executive retreat venue</h1>
      <p>Most teams over-index on aesthetics and under-index on meeting quality. The right executive retreat venue balances logistics, focus, privacy, and enough atmosphere to make the offsite feel different from normal operating mode.</p>
    </section>
    <section class="section grid">
      <div class="card"><h3>1. Start with the retreat objective</h3><p>Board alignment, strategic planning, culture reset, and leadership development all imply different venue shapes.</p></div>
      <div class="card"><h3>2. Match the venue to group size</h3><p>Small executive teams usually benefit from properties with intimate meeting options, not giant conference footprints.</p></div>
      <div class="card"><h3>3. Pressure-test the logistics</h3><p>Airport access, travel friction, room mix, and buyout practicality matter more than brochure language.</p></div>
      <div class="card"><h3>4. Evaluate executive fit</h3><p>Does the venue feel like a place for decisions, or just a place for events?</p></div>
    </section>
    <section class="section"><div class="cta"><h3>Need help shortlisting?</h3><p>Use the shortlist request flow and turn this directory into a more focused decision set.</p><a class="button" href="/services/shortlist-request.html">Request shortlist</a></div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'how-to-choose-an-executive-retreat-venue.html'), layout(`How to choose an executive retreat venue | ${brandName}`, chooseGuideBody));

for (const venue of venues) {
  const siblingStateVenues = venues.filter((item) => item.state === venue.state && item.slug !== venue.slug).slice(0, 3);
  const body = `
    <main class="container detail">
      ${brandBlock}
      <nav class="nav">
        <a href="/index.html">Home</a>
        <a href="/browse/index.html">Browse</a>
        <a href="/states/${stateSlug(venue.state)}.html">${stateLabel(venue.state)}</a>
        <a href="/services/shortlist-request.html">Request shortlist</a>
      </nav>
      <div class="eyebrow">${venue.city}, ${venue.state}</div>
      <h1>${venue.name}</h1>
      <p>${venue.summary}</p>
      <div>
        ${venue.idealFor.map((i) => `<span class="pill">${labelize(i)}</span>`).join('')}
      </div>
      <section class="section card">
        <h2>Planner snapshot</h2>
        <ul class="list">
          <li><strong>Meeting space:</strong> ${venue.meetingSpace}</li>
          <li><strong>Lodging:</strong> ${venue.lodging}</li>
          <li><strong>Airport access:</strong> ${venue.airportAccess}</li>
          <li><strong>Buyout / exclusivity:</strong> ${venue.buyout}</li>
          <li><strong>Verification status:</strong> ${venue.verificationStatus}</li>
          <li><strong>Website:</strong> <a href="${venue.website}">${venue.website}</a></li>
        </ul>
      </section>
      <section class="section split">
        <div class="card"><h2>Why it fits</h2><p>This venue is currently included because it meets the working bar for executive-retreat relevance: direct evidence of meeting or retreat capability, lodging support, and enough detail to make shortlisting more practical than generic travel research.</p></div>
        <div class="cta"><h3>Want a tighter shortlist?</h3><p>Use the shortlist request flow if you want this venue compared against a smaller decision set.</p><a class="button" href="/services/shortlist-request.html">Request shortlist</a></div>
      </section>
      ${siblingStateVenues.length ? `<section class="section"><h2>More in ${stateLabel(venue.state)}</h2><div class="grid">${siblingStateVenues.map(venueCard).join('')}</div></section>` : ''}
      <div class="footer">Verified inventory only.</div>
    </main>
  `;
  fs.writeFileSync(path.join(distDir, 'venues', `${venue.slug}.html`), layout(`${venue.name} | ${brandName}`, body));
}

console.log(`Built ${brandName} with ${venues.length} venues, ${states.length} state pages, service pages, and SEO guides.`);
