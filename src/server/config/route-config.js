(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const wines = require('../routes/wines');

    // *** register routes *** //
    app.use('/api/wines', wines);

  };

})(module.exports);
