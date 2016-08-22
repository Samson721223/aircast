airtunes = require('airtunes');

module.exports = AirCast;

function AirCast(logger, discovery, proxy, settings) {
  this.logger = logger;
  this.discovery = discovery;
  this.proxy = proxy;
  this.settings = settings;
  this._init();
}

AirCast.prototype._init = function () {
  var self = this;

  this.proxy.on('connect', function(socket) {
    self.logger.info('Piping socket data to Airtunes');
    socket.pipe(airtunes, {end: false});
  });

  var stopAll = function() {

    airtunes.stopAll(function () {
      self.logger.info('Airtunes stopped');
    });
  };

  this.proxy.on('stop', stopAll);
  this.proxy.on('end', stopAll);
};