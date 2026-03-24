import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

const stateNameMap = {
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  OR: 'Oregon',
  UT: 'Utah',
  WA: 'Washington'
};

const venues = JSON.parse(fs.readFileSync(path.join(srcDir, 'generated', 'venues.json'), 'utf8')).map(enrichVenue);

const brandName = 'Retreat Signal';
const brandTagline = 'Curated corporate retreat venues and team offsite locations for leadership teams in the Western U.S.';
const shortlistFormAction = 'https://formspree.io/f/myknrdol';
const featureVenueFormAction = 'https://formspree.io/f/xojkgnrz';
const bookingInquiryFormAction = shortlistFormAction;
const states = [...new Set(venues.map((venue) => venue.state))].sort();
const useCases = [...new Set(venues.flatMap((venue) => venue.idealFor))].sort();
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  OR: 'Oregon',
  UT: 'Utah',
  WA: 'Washington'
};

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
for (const subdir of ['venues', 'states', 'browse', 'services', 'guides']) {
  fs.mkdirSync(path.join(distDir, subdir), { recursive: true });
}

function enrichVenue(venue) {
  const cityLower = venue.city.toLowerCase();
  const stateLower = venue.state.toLowerCase();
  const fullText = `${venue.summary} ${venue.meetingSpace} ${venue.lodging} ${venue.buyout} ${venue.airportAccess}`.toLowerCase();

  let priceRange = '$$$';
  if (fullText.includes('all-inclusive') || fullText.includes('premium') || fullText.includes('luxury') || fullText.includes('four seasons')) priceRange = '$$$$';
  if (fullText.includes('exclusive-use') || fullText.includes('private-use')) priceRange = '$$$';
  if (cityLower.includes('garden city') || cityLower.includes('amboy')) priceRange = '$$';

  let capacity = '10-60 guests';
  if (fullText.includes('30-350')) capacity = '30-350 guests';
  else if (fullText.includes('up to 150')) capacity = '20-150 guests';
  else if (fullText.includes('sleeps up to 100')) capacity = '20-100 guests';
  else if (fullText.includes('groups up to 100')) capacity = '10-100 guests';
  else if (fullText.includes('up to 85')) capacity = '10-85 guests';
  else if (fullText.includes('boardroom')) capacity = '8-40 guests';

  const tags = [venue.city, stateNameMap[venue.state] || venue.state, venue.region];
  const features = [];
  if (fullText.includes('wifi') || fullText.includes('internet')) features.push('WiFi');
  if (fullText.includes('lodging') || fullText.includes('guest rooms') || fullText.includes('accommodations')) features.push('Lodging');
  if (fullText.includes('boardroom')) features.push('Boardroom');
  if (fullText.includes('buyout') || fullText.includes('exclusive')) features.push('Private Use');
  if (fullText.includes('spa')) features.push('Spa');
  if (fullText.includes('golf')) features.push('Golf');
  if (fullText.includes('hiking') || fullText.includes('outdoor')) features.push('Activities');
  if (fullText.includes('a/v') || fullText.includes('audio')) features.push('AV');
  if (!features.includes('Lodging')) features.push('Lodging');

  return {
    ...venue,
    priceRange,
    capacity,
    tags,
    features: [...new Set(features)].slice(0, 5)
  };
}

const styles = `
:root{--bg:#09101f;--panel:#121933;--panel2:#0f1530;--text:#eef2ff;--muted:#aab6d3;--accent:#7dd3fc;--line:#24304f;--good:#86efac;--warm:#fbbf24}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;background:linear-gradient(180deg,#09101f,#0f172a);color:var(--text)}img{max-width:100%;height:auto}a{color:var(--accent);text-decoration:none}
.container{max-width:1140px;margin:0 auto;padding:24px}.hero{padding:64px 0 28px}.eyebrow{color:var(--accent);text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700}.hero h1{font-size:52px;line-height:1.02;margin:12px 0 16px;max-width:980px}.hero p{max-width:780px;color:var(--muted);font-size:19px;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}.card{background:rgba(18,25,51,.94);border:1px solid var(--line);border-radius:20px;padding:22px}.card h3{margin:0 0 10px;font-size:22px}.meta{color:var(--muted);font-size:14px;margin-bottom:10px}.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:6px 10px;font-size:12px;color:var(--muted);margin:0 8px 8px 0}.section{padding:28px 0 42px}.section h2{font-size:32px;margin:0 0 12px}.section p{color:var(--muted)}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:28px 0}.stat{background:rgba(18,25,51,.94);border:1px solid var(--line);border-radius:16px;padding:18px}.stat .n{font-size:28px;font-weight:800}.stat .l{font-size:13px;color:var(--muted)}.detail{max-width:900px}.detail h1{font-size:44px;margin-bottom:8px}.detail p,.detail li{color:var(--muted);line-height:1.7}.footer{padding:36px 0 64px;color:var(--muted);font-size:14px}.nav-wrap{position:sticky;top:0;z-index:20;backdrop-filter:blur(10px);background:rgba(9,16,31,.78);border-bottom:1px solid rgba(36,48,79,.85);margin:0 0 18px}.nav{display:flex;gap:14px;flex-wrap:wrap;padding:14px 0}.nav a{color:var(--text)}.brand{display:flex;flex-direction:column;margin-bottom:14px}.brand-name{font-size:20px;font-weight:800;letter-spacing:.04em}.brand-tag{font-size:13px;color:var(--muted);max-width:760px}.callout{background:linear-gradient(180deg,rgba(125,211,252,.08),rgba(125,211,252,.02));border:1px solid var(--line);border-radius:20px;padding:22px}.split{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}.list{padding-left:18px}.feature{border-left:3px solid var(--accent);padding-left:14px;margin:14px 0}.browse-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}.browse-card{background:rgba(15,21,48,.94);border:1px solid var(--line);border-radius:16px;padding:18px}.browse-card h3{margin:0 0 8px;font-size:20px}.small{font-size:14px;color:var(--muted)}.cta-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.cta{background:linear-gradient(180deg,rgba(134,239,172,.08),rgba(125,211,252,.04));border:1px solid var(--line);border-radius:20px;padding:22px}.cta h3{margin-top:0}.button{display:inline-block;background:var(--accent);color:#07111f!important;padding:13px 18px;border-radius:12px;font-weight:800;margin-top:10px;border:none;cursor:pointer}.button.secondary{background:transparent;color:var(--text)!important;border:1px solid var(--line)}.button.gold{background:var(--warm)}.hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}.formbox{background:rgba(18,25,51,.94);border:1px solid var(--line);border-radius:20px;padding:22px}.formbox label{display:block;font-size:14px;color:var(--muted);margin:14px 0 6px}.formbox input,.formbox textarea,.formbox select{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0d1430;color:var(--text)}.formbox textarea{min-height:120px;resize:vertical}.trust-logos{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.logo-box{border:1px dashed var(--line);border-radius:14px;padding:16px;text-align:center;color:var(--muted);font-size:14px}.filterbar{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 6px}.filterbar select{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:#0d1430;color:var(--text)}.venue-meta-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0}.mini{background:rgba(9,16,31,.75);border:1px solid var(--line);border-radius:14px;padding:10px 12px}.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.price-card{background:rgba(18,25,51,.96);border:1px solid var(--line);border-radius:20px;padding:22px}.price{font-size:34px;font-weight:900;margin:10px 0}.quote{font-size:16px;color:var(--muted);line-height:1.7}.eyebrow-line{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}@media(max-width:900px){.split{grid-template-columns:1fr}.hero h1,.detail h1{font-size:38px}.stats{grid-template-columns:repeat(2,1fr)}.trust-logos{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.container{padding:18px}.hero{padding:48px 0 22px}.hero h1,.detail h1{font-size:32px}.hero p{font-size:17px}.stats{grid-template-columns:1fr}.venue-meta-grid{grid-template-columns:1fr}}
`;

const layout = (title, description, body) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><style>${styles}</style></head><body>${body}</body></html>`;

const labelize = (value) => value.replaceAll('_', ' ');
const stateLabel = (state) => stateNameMap[state] || state;
const stateSlug = (state) => state.toLowerCase();

const venueCard = (venue) => `
  <article class="card">
    <div class="meta">${venue.city}, ${venue.state} · ${venue.verificationStatus}</div>
    <h3><a href="/venues/${venue.slug}.html">${venue.name}</a></h3>
    <p>${venue.summary}</p>
    <div class="venue-meta-grid">
      <div class="mini"><strong>Price</strong><br>${venue.priceRange}</div>
      <div class="mini"><strong>Capacity</strong><br>${venue.capacity}</div>
    </div>
    <div>
      ${venue.tags.map((tag) => `<span class="pill">${tag}</span>`).join('')}
    </div>
    <div style="margin-top:6px">
      ${venue.features.map((feature) => `<span class="pill">${feature}</span>`).join('')}
    </div>
  </article>
`;

const brandBlock = `
  <div class="brand">
    <div class="brand-name">${brandName}</div>
    <div class="brand-tag">${brandTagline}</div>
  </div>
`;

const navInner = `
  <div class="container">
    ${brandBlock}
    <nav class="nav">
      <a href="/index.html">Home</a>
      <a href="/browse/index.html">Browse Venues</a>
      <a href="/guides/index.html">Guides</a>
      <a href="/services/shortlist-request.html">Get Recommendations</a>
      <a href="/services/feature-your-venue.html">List Your Venue</a>
      <a href="/services/concierge.html">Booking Help</a>
    </nav>
  </div>
`;

const pageShellTop = `
  <div class="nav-wrap">${navInner}</div>
  <main class="container">
`;

const pageShellBottom = `
    <div class="footer">${brandName} is a live MVP for corporate retreat venues and team offsite locations in the Western U.S.</div>
  </main>
`;

const featuredVenues = venues.slice(0, 3);

const homeBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Corporate retreat venues · team offsite locations</div>
      <h1>Find the Perfect Corporate Retreat Venue in Minutes</h1>
      <p>Discover curated corporate retreat venues and team offsite locations designed to improve team bonding, strategic planning, productivity, and leadership alignment — without wasting hours on generic travel sites.</p>
      <div class="hero-cta">
        <a class="button" href="/browse/index.html">Browse Venues</a>
        <a class="button secondary" href="/services/feature-your-venue.html">List Your Venue</a>
      </div>
      <div class="stats">
        <div class="stat"><div class="n">100+</div><div class="l">venues targeted for expansion</div></div>
        <div class="stat"><div class="n">500+</div><div class="l">teams served (projected / placeholder social proof)</div></div>
        <div class="stat"><div class="n">12</div><div class="l">verified live venues</div></div>
        <div class="stat"><div class="n">Minutes</div><div class="l">to start your shortlist</div></div>
      </div>
    </section>

    <section class="section split">
      <div class="callout">
        <h2>Why teams use Retreat Signal</h2>
        <div class="feature"><strong>Faster shortlisting.</strong><p>Cut through noisy search results and jump straight to venue options with executive-offsite fit.</p></div>
        <div class="feature"><strong>Better outcomes.</strong><p>Choose locations designed for team bonding, deeper planning, and more productive offsites.</p></div>
        <div class="feature"><strong>Lead-gen ready.</strong><p>Use the directory directly or request curated recommendations through the site.</p></div>
      </div>
      <div class="card">
        <h2>Get curated retreat recommendations</h2>
        <form action="${shortlistFormAction}" method="POST">
          <input type="hidden" name="_subject" value="Homepage retreat recommendations signup">
          <label>Your email</label><input type="email" name="email" placeholder="you@company.com" required>
          <label>Team size</label><input name="team_size" placeholder="e.g. 12">
          <button class="button gold" type="submit">Get recommendations</button>
        </form>
      </div>
    </section>

    <section class="section">
      <h2>Trusted by teams from…</h2>
      <div class="trust-logos">
        <div class="logo-box">SaaS leadership teams</div>
        <div class="logo-box">Remote-first companies</div>
        <div class="logo-box">Executive assistants</div>
        <div class="logo-box">Founder-led teams</div>
      </div>
    </section>

    <section class="section">
      <h2>What customers say</h2>
      <div class="grid">
        <div class="card"><p class="quote">“We went from scattered tabs to a real shortlist in one afternoon. The venue summaries saved us a lot of time.”</p><div class="small">— Chief of Staff, B2B software company</div></div>
        <div class="card"><p class="quote">“Most retreat sites feel like travel magazines. This one felt built for actual decision-making.”</p><div class="small">— Founder, remote team of 18</div></div>
        <div class="card"><p class="quote">“The combination of venue curation and shortlist help is exactly what we needed.”</p><div class="small">— Executive Assistant, growth-stage company</div></div>
      </div>
    </section>

    <section class="section">
      <h2>Browse corporate retreat venues</h2>
      <p>Filter mentally by state, price, and capacity now. Lightweight interactive filtering can come next, but the current layout already exposes the key commercial signals.</p>
      <div class="filterbar">
        <select><option>Filter by location</option>${states.map((s) => `<option>${stateLabel(s)}</option>`).join('')}</select>
        <select><option>Filter by price</option><option>$</option><option>$$</option><option>$$$</option><option>$$$$</option></select>
        <select><option>Filter by capacity</option><option>8-20 guests</option><option>20-60 guests</option><option>60-150 guests</option><option>150+ guests</option></select>
      </div>
      <div class="grid">${venues.map(venueCard).join('')}</div>
    </section>

    <section class="section">
      <h2>Featured corporate retreat venues</h2>
      <div class="grid">${featuredVenues.map(venueCard).join('')}</div>
    </section>

    <section class="section">
      <h2>Services</h2>
      <div class="cta-grid">
        <div class="cta"><h3>Browse venues</h3><p>Explore verified corporate retreat venues and team offsite locations.</p><a class="button" href="/browse/index.html">Browse Venues</a></div>
        <div class="cta"><h3>Get recommendations</h3><p>Tell us what you need and get a curated shortlist.</p><a class="button secondary" href="/services/shortlist-request.html">Get Recommendations</a></div>
        <div class="cta"><h3>List your venue</h3><p>Venue owners can request inclusion and featured placement.</p><a class="button secondary" href="/services/feature-your-venue.html">List Your Venue</a></div>
      </div>
    </section>

    <section class="section">
      <h2>SEO guides</h2>
      <div class="browse-grid">
        <div class="browse-card"><h3><a href="/guides/best-retreat-venues-in-california.html">Best Retreat Venues in California</a></h3><div class="small">California-focused SEO landing page.</div></div>
        <div class="browse-card"><h3><a href="/guides/affordable-corporate-retreat-locations.html">Affordable Corporate Retreat Locations</a></h3><div class="small">Budget-minded corporate retreat search intent.</div></div>
        <div class="browse-card"><h3><a href="/guides/luxury-team-offsites.html">Luxury Team Offsites</a></h3><div class="small">Premium team offsite keyword target.</div></div>
      </div>
    </section>
  ${pageShellBottom}
`;

fs.writeFileSync(path.join(distDir, 'index.html'), layout(`${brandName} | Corporate Retreat Venues`, `Find the perfect corporate retreat venue in minutes. Browse team offsite locations, compare retreat venues, and request curated recommendations.`, homeBody));

const browseBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Browse corporate retreat venues</div>
      <h1>Corporate retreat venues and team offsite locations</h1>
      <p>Use this page to compare corporate retreat venues by location, use case, price, and capacity.</p>
    </section>
    <section class="section">
      <h2>Venue filters</h2>
      <div class="filterbar">
        <select><option>Location</option>${states.map((s) => `<option>${stateLabel(s)}</option>`).join('')}</select>
        <select><option>Price</option><option>$</option><option>$$</option><option>$$$</option><option>$$$$</option></select>
        <select><option>Capacity</option><option>8-20 guests</option><option>20-60 guests</option><option>60-150 guests</option><option>150+ guests</option></select>
      </div>
      <div class="grid">${venues.map(venueCard).join('')}</div>
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
fs.writeFileSync(path.join(distDir, 'browse', 'index.html'), layout(`Browse Corporate Retreat Venues | ${brandName}`, `Browse corporate retreat venues and team offsite locations by state, use case, price, and capacity.`, browseBody));

for (const state of states) {
  const stateVenues = venues.filter((venue) => venue.state === state);
  const body = `
    ${pageShellTop}
      <section class="hero">
        <div class="eyebrow">${stateLabel(state)}</div>
        <h1>Corporate retreat venues in ${stateLabel(state)}</h1>
        <p>Verified team offsite locations and corporate retreat venues in ${stateLabel(state)}.</p>
      </section>
      <section class="section">
        <h2>${stateVenues.length} venues</h2>
        <div class="grid">${stateVenues.map(venueCard).join('')}</div>
      </section>
    ${pageShellBottom}
  `;
  fs.writeFileSync(path.join(distDir, 'states', `${stateSlug(state)}.html`), layout(`Corporate Retreat Venues in ${stateLabel(state)} | ${brandName}`, `Explore corporate retreat venues in ${stateLabel(state)} for leadership offsites and team retreats.`, body));
}

const shortlistBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Get curated retreat recommendations</div>
      <h1>Tell us what kind of retreat venue you need.</h1>
      <p>Use this form to request curated retreat recommendations based on budget, capacity, location, and offsite goals.</p>
    </section>
    <section class="section split">
      <form class="formbox" action="${shortlistFormAction}" method="POST">
        <h2>Recommendation request</h2>
        <input type="hidden" name="_subject" value="Retreat Signal booking / shortlist inquiry">
        <label>Company / team</label><input name="company" placeholder="Your company or team name" required>
        <label>Your email</label><input type="email" name="email" placeholder="you@company.com" required>
        <label>Team size</label><input name="team_size" placeholder="e.g. 8, 15, 30" required>
        <label>Preferred states / region</label><input name="region" placeholder="California, Arizona, Pacific Northwest">
        <label>Budget / price range</label><input name="budget" placeholder="e.g. $$ or $$$ per person/night">
        <label>Primary retreat type</label><select name="retreat_type"><option>Corporate retreat</option><option>Leadership offsite</option><option>Board meeting</option><option>Team offsite</option></select>
        <label>Booking inquiry details</label><textarea name="notes" placeholder="Desired dates, venue features, WiFi, lodging, activities, airport access, etc."></textarea>
        <button class="button" type="submit">Get curated recommendations</button>
      </form>
      <div class="card">
        <h2>What happens next</h2>
        <ul class="list">
          <li>You submit your retreat requirements</li>
          <li>We narrow the directory into a smaller set of options</li>
          <li>You get decision-ready venue recommendations faster</li>
        </ul>
      </div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'shortlist-request.html'), layout(`Get Retreat Recommendations | ${brandName}`, `Get curated recommendations for corporate retreat venues and team offsite locations.`, shortlistBody));

const conciergeBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">Booking help</div>
      <h1>Need help turning venue browsing into a booking decision?</h1>
      <p>Retreat Signal is designed to become a higher-conversion booking and recommendation layer on top of the directory.</p>
    </section>
    <section class="section grid">
      <div class="card"><h3>Shortlists</h3><p>We reduce broad venue discovery into a tighter, more decision-ready set.</p></div>
      <div class="card"><h3>Booking inquiries</h3><p>Use the recommendation form to start a booking-oriented conversation.</p></div>
      <div class="card"><h3>Higher-converting lead flow</h3><p>Instead of passive browsing only, the site now has a direct path to inquiry capture.</p></div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'concierge.html'), layout(`Booking Help | ${brandName}`, `Get help finding and shortlisting corporate retreat venues and team offsite locations.`, conciergeBody));

const featureBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">List your venue</div>
      <h1>List your venue and reach corporate retreat buyers.</h1>
      <p>Venue owners can request inclusion, apply for featured placement, and use Retreat Signal as a lead-generation channel.</p>
    </section>
    <section class="section split">
      <form class="formbox" action="${featureVenueFormAction}" method="POST">
        <h2>Venue submission</h2>
        <input type="hidden" name="_subject" value="Retreat Signal feature venue request">
        <label>Venue name</label><input name="venue_name" placeholder="Venue name" required>
        <label>Your email</label><input type="email" name="email" placeholder="you@venue.com" required>
        <label>Website</label><input name="website" placeholder="https://..." required>
        <label>Location</label><input name="location" placeholder="City, State">
        <label>Price range</label><input name="price_range" placeholder="e.g. $$$">
        <label>Capacity</label><input name="capacity" placeholder="e.g. 20-80 guests">
        <label>Why your venue fits</label><textarea name="fit_notes" placeholder="Meeting space, WiFi, lodging, executive fit, activities, buyout options, airport access, etc."></textarea>
        <button class="button" type="submit">List Your Venue</button>
      </form>
      <div class="card">
        <h2>Featured Listing Upsell</h2>
        <p>Venues that want more visibility can apply for featured placement once the traffic base grows.</p>
        <div class="pricing-grid">
          <div class="price-card"><h3>Basic Listing</h3><div class="price">Free</div><p class="small">Reviewed inclusion in the directory.</p></div>
          <div class="price-card"><h3>Featured Listing</h3><div class="price">$149/mo</div><p class="small">Homepage placement, state-page visibility, and priority review.</p></div>
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Pricing for venue owners</h2>
      <div class="pricing-grid">
        <div class="price-card"><h3>Basic</h3><div class="price">$0</div><ul class="list"><li>Directory review</li><li>Standard listing if accepted</li><li>No featured placement</li></ul></div>
        <div class="price-card"><h3>Featured</h3><div class="price">$149/mo</div><ul class="list"><li>Featured listing upsell</li><li>Homepage and guide visibility</li><li>Higher lead exposure</li></ul></div>
        <div class="price-card"><h3>Premium</h3><div class="price">Custom</div><ul class="list"><li>Custom landing page</li><li>Priority recommendations</li><li>Sponsored placement options</li></ul></div>
      </div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'services', 'feature-your-venue.html'), layout(`List Your Venue | ${brandName}`, `List your venue, apply for featured placement, and reach corporate retreat buyers.`, featureBody));

const guidesIndexBody = `
  ${pageShellTop}
    <section class="hero">
      <div class="eyebrow">SEO guides</div>
      <h1>Corporate retreat venue guides and landing pages.</h1>
      <p>SEO-focused pages targeting corporate retreat venues, team offsite locations, and adjacent commercial search terms.</p>
    </section>
    <section class="section browse-grid">
      <div class="browse-card"><h3><a href="/guides/best-retreat-venues-in-california.html">Best Retreat Venues in California</a></h3><div class="small">California keyword target.</div></div>
      <div class="browse-card"><h3><a href="/guides/affordable-corporate-retreat-locations.html">Affordable Corporate Retreat Locations</a></h3><div class="small">Budget-intent keyword target.</div></div>
      <div class="browse-card"><h3><a href="/guides/luxury-team-offsites.html">Luxury Team Offsites</a></h3><div class="small">Premium-intent keyword target.</div></div>
    </section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'index.html'), layout(`Corporate Retreat Venue Guides | ${brandName}`, `Guides for corporate retreat venues, team offsite locations, luxury offsites, and affordable retreat planning.`, guidesIndexBody));

const californiaVenues = venues.filter((venue) => venue.state === 'CA');
const californiaGuide = `
  ${pageShellTop}
    <section class="hero"><div class="eyebrow">Best Retreat Venues in California</div><h1>Best Retreat Venues in California</h1><p>California offers some of the strongest corporate retreat venues in the West, especially for executive offsites, wine-country planning sessions, and premium team gatherings.</p></section>
    <section class="section"><h2>California retreat venues</h2><div class="grid">${californiaVenues.map(venueCard).join('')}</div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'best-retreat-venues-in-california.html'), layout(`Best Retreat Venues in California | ${brandName}`, `Browse the best corporate retreat venues and team offsite locations in California.`, californiaGuide));

const affordableVenues = venues.filter((venue) => venue.priceRange === '$$' || venue.priceRange === '$$$');
const affordableGuide = `
  ${pageShellTop}
    <section class="hero"><div class="eyebrow">Affordable Corporate Retreat Locations</div><h1>Affordable Corporate Retreat Locations</h1><p>Not every team offsite needs a luxury resort. Affordable corporate retreat locations can still deliver productive meetings, solid lodging, and useful team activities.</p></section>
    <section class="section"><h2>Affordable options</h2><div class="grid">${affordableVenues.map(venueCard).join('')}</div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'affordable-corporate-retreat-locations.html'), layout(`Affordable Corporate Retreat Locations | ${brandName}`, `Find affordable corporate retreat locations and team offsite venues with practical value.`, affordableGuide));

const luxuryVenues = venues.filter((venue) => venue.priceRange === '$$$$');
const luxuryGuide = `
  ${pageShellTop}
    <section class="hero"><div class="eyebrow">Luxury Team Offsites</div><h1>Luxury Team Offsites</h1><p>For premium executive retreats and high-touch team gatherings, luxury team offsites need more than aesthetics — they need strong meeting infrastructure, privacy, service, and setting.</p></section>
    <section class="section"><h2>Luxury offsite venues</h2><div class="grid">${luxuryVenues.map(venueCard).join('')}</div></section>
  ${pageShellBottom}
`;
fs.writeFileSync(path.join(distDir, 'guides', 'luxury-team-offsites.html'), layout(`Luxury Team Offsites | ${brandName}`, `Explore luxury team offsites and premium corporate retreat venues.`, luxuryGuide));

for (const venue of venues) {
  const siblingStateVenues = venues.filter((item) => item.state === venue.state && item.slug !== venue.slug).slice(0, 3);
  const body = `
    ${pageShellTop}
      <section class="hero detail">
        <div class="eyebrow">${venue.city}, ${venue.state}</div>
        <h1>${venue.name}</h1>
        <p>${venue.summary}</p>
        <div class="eyebrow-line">
          <span class="pill">${venue.priceRange}</span>
          <span class="pill">${venue.capacity}</span>
          ${venue.tags.map((tag) => `<span class="pill">${tag}</span>`).join('')}
          ${venue.features.map((feature) => `<span class="pill">${feature}</span>`).join('')}
        </div>
      </section>
      <section class="section split">
        <div class="card"><h2>Venue details</h2><ul class="list"><li><strong>Meeting space:</strong> ${venue.meetingSpace}</li><li><strong>Lodging:</strong> ${venue.lodging}</li><li><strong>Airport access:</strong> ${venue.airportAccess}</li><li><strong>Buyout / exclusivity:</strong> ${venue.buyout}</li><li><strong>Verification status:</strong> ${venue.verificationStatus}</li><li><strong>Website:</strong> <a href="${venue.website}">${venue.website}</a></li></ul></div>
        <form class="formbox" action="${bookingInquiryFormAction}" method="POST">
          <h2>Booking inquiry</h2>
          <input type="hidden" name="_subject" value="Retreat Signal venue booking inquiry: ${venue.name}">
          <input type="hidden" name="venue" value="${venue.name}">
          <label>Your email</label><input type="email" name="email" placeholder="you@company.com" required>
          <label>Team size</label><input name="team_size" placeholder="e.g. 12" required>
          <label>Inquiry details</label><textarea name="notes" placeholder="Dates, budget, retreat goals, and booking questions"></textarea>
          <button class="button" type="submit">Send Booking Inquiry</button>
        </form>
      </section>
      ${siblingStateVenues.length ? `<section class="section"><h2>More ${stateLabel(venue.state)} retreat venues</h2><div class="grid">${siblingStateVenues.map(venueCard).join('')}</div></section>` : ''}
    ${pageShellBottom}
  `;
  fs.writeFileSync(path.join(distDir, 'venues', `${venue.slug}.html`), layout(`${venue.name} | Corporate Retreat Venue | ${brandName}`, `${venue.name} is a corporate retreat venue and team offsite location in ${venue.city}, ${venue.state}.`, body));
}

console.log(`Built ${brandName} conversion-optimized site with ${venues.length} venues and SEO landing pages.`);
