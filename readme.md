# Streem Site Notes
## Summary
Currently, the site is just a static HTML site that uses NPM and Gulp to handle the build and deployment via Netlify. Please be aware of the following configurations.

- Currently the _redirects file in the root will setup rewrite rules on Netlify so we can use vanity URLs like: '/about' instead of '/about.html'.
- Because we are using static HTML, some elements are shared between pages and must be updated in all files when changed. This is to maximize performance isntead of ajax loading more content until we move to a CMS or server side templates.

## Netlify Deployment
Deploying with Netlify is a breeze, however, you do need to remember to configure two specific items.

- Be sure your deployment instructions run the `gulp build` command.
- The root directory should be set to `dist/`

This ensures that Netlify will build the newest version of the site when deployment occurs and targets the output from that build process and the root path of the site.

