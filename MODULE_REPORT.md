## Module Report
### Unknown Global

**Global**: `Ember.RouterDSL`

**Location**: `addon/utils/dsl-route-extend.js` at line 4

```js
export default {
  routeMetadata: null,
  oldRoute: Ember.RouterDSL.prototype.route,
  init(metaDataService) {
    this.setRouterDSLProto();
```

### Unknown Global

**Global**: `Ember.RouterDSL`

**Location**: `addon/utils/dsl-route-extend.js` at line 18

```js
  },
  destroy() {
    Ember.RouterDSL.prototype.route = this.oldRoute;
  },
  setRouterDSLProto() {
```

### Unknown Global

**Global**: `Ember.RouterDSL`

**Location**: `addon/utils/dsl-route-extend.js` at line 21

```js
  },
  setRouterDSLProto() {
    Ember.RouterDSL.prototype.route = this.route;
  },
};
```
