const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withCSS(
  withOffline({
    webpack: function(config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000,
            name: "[name].[ext]"
          }
        }
      });
      return config;
    },
    workboxOpts: {
      runtimeCaching: [
        {
          urlPattern: /.mp4$/,
          handler: "networkOnly"
        }
      ]
    }
  })
);
