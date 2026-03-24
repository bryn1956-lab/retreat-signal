import fs from 'fs';
import path from 'path';

const siteRoot = path.resolve(process.cwd());
const dataPath = path.resolve(siteRoot, '../data/venues.json');
const outDir = path.join(siteRoot, 'src', 'generated');

fs.mkdirSync(outDir, { recursive: true });
const venues = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
fs.writeFileSync(path.join(outDir, 'venues.json'), JSON.stringify(venues, null, 2));
console.log(`Copied ${venues.length} venues to src/generated/venues.json`);
