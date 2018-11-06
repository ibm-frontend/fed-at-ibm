# FED@IBM Website

https://fed-at-ibm.mybluemix.net is the public home for IBM’s front-end development community.

This project uses [React.js](https://github.com/facebook/react/)/[Next.js](https://github.com/zeit/next.js/) for the front-end and [Node.js](https://nodejs.org/en/)/[Express.js](https://expressjs.com/) for a server.

## Content Editing

Most content can be edited from https://app.contentful.com in the IBM organization, within the FED@IBM space. The latest drafts of content can be previewed at https://fed-at-ibm-staging.mybluemix.net before being published.

## Development

### Setup

1.  Install [Node.js](https://nodejs.org/en/)
2.  Command line: `git clone git@github.com:ibm-frontend/fed-at-ibm.git && cd fed-at-ibm && npm install`
3.  Reach out to James Rauhut, Kelly Churchill, or Scott Strubberg for a `.keys.js` file to include in the root of `fed-at-ibm`. This includes all of the API keys for Contentful content.
4.  Set up secure https for dev mode:
    1. From a finder window open `fed-at-ibm/certs/localhost.cer` with Keychain Access
    2. In Keychain Access, select `Certificates` in the left sidebar
    3. Right click `localhost` and select `Get Info`
    4. In the `Get Info` window, expand the `Trust` panel
    5. For `When using this certificate` select `Always Trust`

### Run dev mode

Command line: `npm start`

View at https://localhost:3000. Remember, that you have to use `https` for a secure connection.

### Firefox

Firefox will fail to load after an `npm start` and throw an error referencing an improperly configured site. This has to do with the signing of the certificate used and can be safely ignored.

### Folder structure

Please refer to [Next.js](https://nextjs.org/learn/) before getting started on this project. Next.js provides server-side rendering and performant code splitting in a minimalistic way. This allows you to focus on the actual React UI code. To change the HTML document for all pages, edit `fed-at-ibm/pages/_document.js`. To edit the React shell for all of the pages (like where you would include a nav bar), edit `fed-at-ibm/pages/_app.js`.

All React components that you want to appear as a normal page with a route should be in `fed-at-ibm/pages/`.

All other React components can be placed in `fed-at-ibm/components/`.

All server-side code is done in Node with [Express.js](https://expressjs.com/) and is located in `fed-at-ibm/server/`.

### Styling

This project uses [Styled Components](https://www.styled-components.com/). Styled Components automatically scopes styles for less mistakes, can be conditional based on props passed down, and provides only the expected styles per a page with Next.js code splitting.

### Static files

To add static files, like an image, place the file in `static/`. When referencing the file, prefix the path with `/static/`. Example:

```css
div {
  background-image: url("/static/yourImage.jpg");
}
```

## Deploy

All deployments require the following:

- [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed
- An account at https://console.w3ibm.bluemix.net/dashboard/apps
- Your account is added to the `IBMDesignOrg` org and you have permission to update apps at the `fed-dallas` space

When updating an existing app, we have scripts keep the old app up until the new app is done deploying. You will almost always only use the "update" scripts below. The "deploy" scripts below the "update" scripts will provide unnecessary downtime. Each deployment process will request your w3 IBM Cloud login. This should be your w3 credentials.

- Update Staging: `npm run deploy`
- Update Production: `npm run deploy:prod`

Staging Link: https://fed-at-ibm-staging.mybluemix.net

Production Link: https://fed-at-ibm.mybluemix.net
