import Ember from 'ember';
export default {
  //_router: Ember.RouterDSL.prototype.route,
  routeMetadata: null,
  oldRoute: Ember.RouterDSL.prototype.route,
  init (metaDataService) {
    this.setRouterDSLProto();
    let oldRoute = this.oldRoute;
    this.route = function (name, options = {}) {
      oldRoute.call(this, ...arguments);
      name = getFullName(this, name, options.resetNamespace);
      if (arguments.length >= 2 && typeof options !== 'function') {
        metaDataService._registerRoute(name, options);
      }
    };
    this.setRouterDSLProto();
  },
  destroy() {
    Ember.RouterDSL.prototype.route = this.oldRoute;
  },
  setRouterDSLProto() {
    Ember.RouterDSL.prototype.route = this.route;
  }
};

function canNest(dsl) {
  return dsl.parent !== 'application';
}

function getFullName(dsl, name, resetNamespace) {
  if (canNest(dsl) && resetNamespace !== true) {
    return `${dsl.parent}.${name}`;
  } else {
    return name;
  }
}
