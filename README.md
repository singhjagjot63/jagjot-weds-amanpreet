# Jagjot & Amanpreet: wedding invitation website

A static website. There is nothing to install or build: `index.html` plus the `assets/` folder is the whole site.

## Preview on your computer
Double-click `index.html`. For a closer match to the live site, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Background music
- By default the site plays a soft original instrumental that it generates in the browser, so no file is needed.
- To use a song of your choice, save it as `assets/music.m4a`. The site plays that file instead. (MP3 also works; change `var FILE` in `index.html` to `assets/music.mp3` if you use one.)
- Use a track you have the rights to. Popular film songs are copyrighted, and a public website can draw takedown notices. Royalty-free or licensed music is the safe choice.
- Browsers only allow sound after a tap, so music starts when guests tap "Open invitation". The round button at the bottom right turns it on or off.

## Put it online (all of these have free plans)
1. **Netlify Drop**: open app.netlify.com/drop, drag this whole folder onto the page, and you get a link right away. You can rename the link and attach your own domain later.
2. **Cloudflare Pages**: Workers & Pages, Create, Pages, Upload assets, then upload this folder.
3. **GitHub Pages**: put the files in a repository, then Settings, Pages, deploy from the main branch.

A custom domain such as jagjotamanpreet.com is the only part that costs money, usually about 800 to 1,200 rupees a year.

## Editing
Everything is in `index.html`. Search for the text you want to change (dates, venues, names). The countdown target is the line starting `var target = new Date(` near the bottom, written in Indian time.
