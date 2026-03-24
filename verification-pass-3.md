# Verification Pass 3

Track A continued. We pushed beyond fully direct verification and introduced a second tier: `search_verified`.

## Why
Some high-quality candidate venues are clearly a fit, but their websites are currently difficult to extract cleanly with the available fetch tooling because of:
- JS-heavy pages
- unstable / changed content paths
- partial page extraction

Rather than lose momentum, we now have two confidence levels:
- `verified` = supported by direct page fetch with usable planner details
- `search_verified` = supported by strong search-result evidence and/or snippets, but still needs a cleaner direct scrape later

## Added as search_verified
1. Ojai Valley Inn
2. Carmel Valley Ranch
3. Canyon Ranch Woodside

## Confidence notes
### Ojai Valley Inn
Strong signals:
- dedicated Executive Meetings page exists
- explicit snippet: executive meetings department specializes in intimate events and executive retreats
- meeting-space snippets include boardroom-style and focused meeting spaces

### Carmel Valley Ranch
Strong signals:
- dedicated meetings page exists
- snippet references company gatherings and Valley Lawn for meetings/events
- meetings brochure exists

### Canyon Ranch Woodside
Strong signals:
- group/corporate retreat experiences are indexed
- guest-room page snippet states: groups can book the retreat and mid-week is reserved exclusively for groups
- very strong conceptual fit for executive and wellness-led offsites

## Current inventory count
- 9 fully verified
- 3 search_verified
- 12 total near-launch candidates

## Recommendation
Use the 9 fully verified items as the hard launch base.
Use the 3 search_verified items as conditional additions, to be upgraded later when we have better extraction or browser automation.
