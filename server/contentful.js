const apicache = require("apicache");
const contentful = require("contentful");
const keys = require("../.keys.js");

const cache = apicache.middleware;
// Content Delivery API - Only delivers content that has been "published"
// Content Preview API - Delivers the latest draft of all content
const client = contentful.createClient({
  space: "tr3gffbq95ak",
  accessToken: process.env.CONTENTFUL_PREVIEW
    ? keys.contentPreviewAPI
    : keys.contentDeliveryAPI,
  host: process.env.CONTENTFUL_PREVIEW ? "preview.contentful.com" : undefined
});

// Contentful’s API limits 78 requests per second
// This function caches responses by making a request every 10 seconds
// @param {function} server - Express server
// @param {string} endpointName - Endpoint path after `/design/contentful/` for this request
// @param {object} entryDetails - Contentful Content API parameters
// @param {boolean} [scheduled] - Content model has a required field called `releaseDatetime` and that we should only fetch content already scheduled for release
const addContentfulEndpoint = (
  server,
  endpointName,
  entryDetails,
  scheduled
) => {
  server.get(`/contentful/${endpointName}`, cache("10 seconds"), (req, res) => {
    const releaseSchedule = scheduled
      ? { "fields.releaseDateTime[lte]": new Date().toISOString() }
      : {};

    client
      .getEntries({
        ...entryDetails,
        ...releaseSchedule
      })
      .then(response => {
        res.send(response);
      })
      .catch(err => console.log(err));
  });
};

module.exports = server => {
  addContentfulEndpoint(
    server,
    "feducations",
    {
      content_type: "feducation",
      order: "-fields.releaseDateTime"
    },
    true
  );

  server.get(`/contentful/feducation/:id`, cache("10 seconds"), (req, res) => {
    client
      .getEntries({
        content_type: "feducation",
        "sys.id": req.params.id,
        "fields.releaseDateTime[lte]": new Date().toISOString()
      })
      .then(response => {
        res.send(response);
      })
      .catch(err => console.log(err));
  });
};
