const {
  overrideDevServer
} = require('customize-cra');

module.exports = {
  devServer(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
      const oldBefore = config.before;
      config.before = function before(app, server) {
        
        oldBefore(app, server);
      }
      return config;
    };
  }
}
