import dsl from '../utils/dsl-route-extend';
import Ember from 'ember';

export default Ember.Service.extend({
  _routes: {},
  _attributes: [
    'pageName'
  ],
  init() {
    this._routes = {};
    this._super();
  },
  /**
   * Set the default meta attributes that should be found
   * @param {string[]} attrs Array of strings of the meta property names
   * @return {null} not return value
   */
  setAttrs(attrs) {
    if (attrs && attrs.length) {
      this._attributes = attrs;
    } else {
      throw `Attrs could not be set, the array must contain at least one attribute`;
    }
  },

  /**
   * Register route metadata
   * @param {String} route Name of the route to register
   * @param {Object} options attributes for the route
   * @return {object} Returns the route metadata object
   */
  _registerRoute (route, options = {}) {
    if (this._routes[route]) {
      throw `Route ${route} has already been registered`;
    } else {
      this._routes[route] = options;
    }
    return this._routes[route];
  },
  /**
   * Find the parent of the route
   * @param {String} route Name of the route
   * @return {object} Parent of the route if found or null
   */
  _getParentRoute (route = '') {
    return route.substring(0, route.lastIndexOf('.')) || null;
  },
  /**
   * Create a object with only the attr you want
   * @param {Object} metaData metadata object you wish to edit
   * @param {Object} attrs attributes you would like to keep
   * @return {Object} edited metaData object
   */
  _removeUnnecessaryAttrs(metaData, attrs) {
    let obj = {};
    if (metaData) {
      attrs.forEach((key) => {
        obj[key] = metaData[key];
      });
    }
    return metaData ? obj : null;
  },
  /**
   * Get route by route Name
   * @param {String} route Name of route
   * @return {Object} route meta data object
   */
  getRoute(route) {
    return this._routes[route];
  },
  /**
   * Gets the meta data of a route using its name with optional parameter for specific metaData keys.
   * if a route is missing an attribute it will bubble up and take its parent's if applicable
   * Key Values that can be used in this.route()
   * @param {String} route The current route
   * @param {Object} attrs
   * e.g.
   * pageName {String} The name you would like to use for that route
   * pageType {String} The type of page it is, will inherit parents type if not specified
   * section {String} The section that this page belogs too, will inherit parents section if not specified
   * @return {Object} metaData found for specified Route
   */
  getMetaDataByRoute(route, attrs = this._attributes) {
    if (!route) {
      throw 'Route is Null or undefined';
    }
    let metaData = this.getRoute(route),
      parentRoute = this._getParentRoute(route),
      routesLeft = route.split('.');
    if (metaData) {
      let missingAttrs = [];
      attrs.forEach((key) => {
        if (!metaData[key]) {
          missingAttrs.push(key);
        }
      });
      if (missingAttrs.length && routesLeft.length > 1) {
        let parentMeta = this.getMetaDataByRoute(parentRoute, missingAttrs);
        missingAttrs.forEach((key) => {
          metaData[key] = parentMeta[key];
        });
      } else if (missingAttrs.length && routesLeft.length === 1) {
        throw `Route: ${route}. Can't complete metadata object. Missing ${this.optionsToString(missingAttrs)}`;
      }
    } else if (routesLeft.length > 1) {
      metaData = this.getMetaDataByRoute(parentRoute, attrs);
    }
    return this._removeUnnecessaryAttrs(metaData, attrs);
  },
  /**
   * Edit the meta data of a defined route
   * @param {String} route The route you wish to edit edit
   * @param {String} key Key of attribute to change
   * @param {Object} val Attribute to change
   * @return {undefined}
   */
  editRoute(route, key, val) {
    let metaData = this.getRoute(route);
    if (metaData) {
      metaData[key] = val;
    } else {
      throw `Route: ${route} was not found`;
    }
  },
  optionsToString(options) {
    let str = '';
    options.forEach((key) => {
      str += `${key}, `;
    });
    return str;
  },
  destroy() {
    this._routes = {};
    dsl.destroy();
    this._super();
  }
});
