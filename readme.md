# Streem Site Notes
## Summary
Currently, the site is just a static HTML site that uses NPM and Gulp to handle the build and deployment via Netlify. Please be aware of the following configurations.

- Currently the _redirects file in the root will setup rewrite rules on Netlify so we can use vanity URLs like: '/about' instead of '/about.html'.
- Because we are using static HTML, some elements are shared between pages and must be updated in all files when changed. This is to maximize performance isntead of ajax loading more content until we move to a CMS or server side templates.

## Development
This section will provide a few quick notes to help you get started making changes to this project.

- All of the source assets and code are contained within the `src/` folder. This is the only folder you should ever be changing assets or code in.
- Before you begin, run `npm install` at the root folder to install all of the required node modules for building the project.
- Now, run the `gulp dev` command. This will open a browser window where you can see the project. This window will automatically refresh as you make changes to code or assets in the project.
- When you are ready for deployment, you can use `gulp build` which will do a clean build to the `dest/` folder.

## Netlify Deployment
Deploying with Netlify is a breeze, however, you do need to remember to configure two specific items.

- Be sure your deployment instructions run the `gulp build` command.
- The root directory should be set to `dist/`

This ensures that Netlify will build the newest version of the site when deployment occurs and targets the output from that build process and the root path of the site.

## Alerts
The newest version supports "Alerts" which can be displayed at the top of all pages until dismissed by the user. These can be enabled/disabled via changes to the `alert.json` file in the `src/data` folder.

The table below lists the available options and their function.

|Name|Purpose|
|----|-------|
|enabled|This allows us to control whether the alert is active or not.|
|id|This is what is used to track whether the user has seen this alert or not. Each time a new alert message is added, this `id` should be changed.|
|message|This is the message that will be shown inline on the alert. This should be a fairly short summary of the alert, the link should provide details.|
|details_url|This is the URL that will be used for the `Learn more` button on the alert bar. This link will always open in a new tab to keep focus on the site.|
|style|This controls the style of the alert. There are currently three styles. `notice`, `warning` or `danger`.

