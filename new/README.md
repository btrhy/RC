# Rhyder Constructions

A build-free website for GitHub Pages. The three pages have ordinary URLs and use relative links, so the site also works under a GitHub repository path.

## Plan and structure

| Page | Purpose | Source |
| --- | --- | --- |
| Home | Company mark, short introduction, projects and contact links | `index.html` |
| Projects | Three entries using one project template and a direct contact link | `projects/index.html`, `assets/projects-data.js` |
| Contact | Google Form slot, existing enquiry email and Instagram | `contact/index.html` |

`assets/site.css` contains the shared layout, responsive rules and theme palettes. `assets/projects.js` fills the project template from the data file. `assets/themes.js` handles the temporary theme control. There are no packages to install.

## Preview

From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://localhost:8000](http://localhost:8000). Use the floating theme buttons to switch between Field (split layout), Studio (centred layout and project cards), Blueprint (framed sections), Timber (inset panels), and Basalt (image-led layout). The current choice carries across pages in the same browser.

## Add project content

Replace the three sample entries in `assets/projects-data.js` with your own titles, subtitles and descriptions. Add five to eight photos per entry under `assets/photos/` and give each image descriptive alt text. For example:

```js
photos: [
  { src: './photos/example/front.webp', alt: 'Front elevation with vertical timber cladding' },
  // Add the remaining images here.
],
```

Photo paths are relative to `assets/`. Put the lead photo first. Update the Projects introduction once the gallery contains real work. On the home page, replace the illustrative hero with an approved photo, update its alt text and dimensions, then remove the illustration caption.

## Add the enquiry form

Replace the paragraph marked `form-placeholder` in `contact/index.html` with the published Google Forms iframe. Use the embed URL ending in `/viewform?embedded=true` and give the iframe a title such as `Project enquiry form`. The shared stylesheet sizes it to the form panel. Check the form’s public access settings and submit a test entry on mobile before launch.

## Keep one theme

Set the same `data-theme` value in all three HTML files, using `field`, `studio`, `blueprint`, `timber` or `basalt`. Remove the `themes.js` script tag from each page, delete that file and remove the `.theme-switcher` and `.has-theme-switcher` styles.

## Publish to GitHub Pages

1. Commit the contents of this directory to the root of the GitHub repository, including `.nojekyll`.
2. In **Settings → Pages**, choose **Deploy from a branch**, then select the branch and **/(root)**.
3. Open the GitHub Pages URL and check all three pages before moving the custom domain.

[GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
