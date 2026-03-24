# Verification Pass 2

Added 4 more directly verified venues to the shortlist:
- Salish Lodge & Spa
- Willows Lodge
- Brasada Ranch
- Carneros Resort and Spa

## What happened
A few target properties had JS-heavy or changed URLs, so the reliable path was:
1. use search to find the correct current meetings/events pages
2. fetch those pages directly
3. keep only venues with clear planner-useful detail

## Newly verified notes
### Salish Lodge & Spa
- 30 minutes east of Seattle
- groups up to 100
- flexible event spaces
- luxurious accommodations
- day rates and half-day rates surfaced
- useful for executive or board-style retreats

### Willows Lodge
- 5,000+ sq ft of meeting and banquet space
- 7 flexible meeting rooms
- events up to 150 attendees
- explicit board meeting and corporate-event suitability
- strong Seattle-proximity option

### Brasada Ranch
- 12,000+ sq ft of meeting and event venues
- explicit executive retreat / corporate conference positioning
- strong Oregon high-desert setting
- good candidate for homepage or Oregon landing page

### Carneros Resort and Spa
- 38,000+ sq ft of flexible indoor/outdoor venues
- Napa Ballroom and smaller executive-suitable spaces
- clear retreat/corporate positioning
- strong premium California option

## Still problematic / not yet verified well enough
- Canyon Ranch Woodside: search results indicate strong group fit and midweek group bookings, but direct fetch quality was not reliable enough yet for full verification.
- Ojai Valley Inn: search results strongly suggest fit, but direct page fetch path is unstable and needs a cleaner pass.
- Carmel Valley Ranch: page fetch is too JS-heavy to extract planner details cleanly in current tooling.

## Current verified count
9 venues

## Recommendation
Continue until we reach 12-15 verified venues, then start generating page templates and build inventory pages from the verified dataset only.
