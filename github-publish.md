# GitHub Publish Plan

## Target repo
- https://github.com/bryn1956-lab/retreat-signal.git

## Current recommended structure
Keep the full workspace local, but publish the retreat site from this project path:
- `projects/retreat-directory/site`

## Cloudflare Pages settings
- Root directory: `projects/retreat-directory/site`
- Build command: `npm run build`
- Output directory: `dist`

## Important
The current local git repository is the whole OpenClaw workspace, not a dedicated retreat-only repo.

That means there are two options:
1. push the whole workspace repo to GitHub
2. create a dedicated git repo for `projects/retreat-directory/site` or `projects/retreat-directory`

## Recommendation
Use a dedicated repo for `projects/retreat-directory/site` or `projects/retreat-directory`.
This keeps the public repo clean and avoids publishing unrelated workspace files.
