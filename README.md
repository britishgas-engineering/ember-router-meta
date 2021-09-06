# ember-router-meta

This add on is to help users add meta data to routes in their ember applications.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Using the add on

The add on extends the `this.route()` function that is used in the `router.js` file to define your routes.
For example if you wanted to add a `pageName` to your route you could do the following.
```
Router.map(function() {
  this.route('example', {pageName: 'example Route'}, function() {
    this.route('child', {pageName: 'child Route'});
  });
});
```
This can be used with any attribute name, providing that ember does not currently use it (such as resetNamespace).


## route-metadata Service

The service `route-metadata` will store the meta data of each route, so will need to be injected into the route in order to access the data.

`routeMetadata: Ember.inject.service();`

### getMetaDataByRoute(route, attrs(optional)) 

All that is required to get the meta data of the route is the route name.
`this.get('routeMetadata').getMetaDataByRoute('example.route')` 
The second parameter `attrs` is used to specify the attribute's you would like.

`this.get('routeMetadata').getMetaDataByRoute('example.route', ['pageName', pageType, section]);`

If the child does not have a specified attribute it will check it's parent routes to inherit that attribute.

By default the only attribute that will be returned is the pageName, this can be changed by using `setAttrs()` to override `pageName` as the default attribute. Or by adding your own default list in the environment.js file.

```
...
  emberRouterMeta: {
    defaultAttrs: [
      'pageName',
      'pageType',
      'section'
    ]
  }
...
```

### editRoute(route, key, val)

To edit a route's data at run time `editRoute()` can be used to change a specific attribute.

* @param {String} route The route you wish to edit edit
* @param {String} key Key of attribute to change
* @param {Object} val Attribute to change

### getRoute(route)

`getRoute(route)` can also be used to get the route meta data, but it will not filter unwanted attributes and will not attempt to find missing attributes from parent routes.

##


Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-router-meta`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

See the [Contributing](CONTRIBUTING.md) guide for details.

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
