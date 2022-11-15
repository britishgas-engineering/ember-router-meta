import { run } from '@ember/runloop';
import dsl from 'ember-router-meta/utils/dsl-route-extend';
import { module, test } from 'qunit';

module('Unit | Utility | dsl-route-extend', function() {
  test('Adds routes to service', function(assert) {
    let callback = sinon.spy(),
    routeMetadata = {
      _registerRoute() {
        callback();
      }
    },
    mockRouter = {
      route(name, options, func) {
        callback();
        if (func) {
          func();
        }
      }
    };
    run(() => {
      dsl.setRouterDSLProto = function() {
        return true;
      }
      dsl.oldRoute = mockRouter.route;
      dsl._router = function() {
        return true;
      }
      dsl.init(routeMetadata, mockRouter);
    })

    run(() => {
      dsl.route('example', {pageName: 'test'}, function() {
        dsl.route('dashboard', {pageName: 'DashBoard'});
      });
    })
    assert.equal(callback.callCount, 4, '_registerRoute and mockRouter called twice')
  });

  test('Adds routes to service - getFullName - resetNamespace', function(assert) {
    let callback = sinon.spy(),
    names = [],
    routeMetadata = {
      _registerRoute(name) {
        names.push(name)
        callback();
      }
    },
    mockRouter = {
      route(name, options, func) {
        callback();
        if (func) {
          func();
        }
      }
    };
    run(() => {
      dsl.setRouterDSLProto = function() {
        return true;
      }
      dsl.oldRoute = mockRouter.route;
      dsl._router = function() {
        return true;
      }
      dsl.init(routeMetadata, mockRouter);
    })

    run(() => {
      dsl.route('example', {pageName: 'test'}, function() {
        dsl.route('dashboard', {pageName: 'DashBoard', resetNamespace: true});
      });
    })
    assert.equal(callback.callCount, 4, '_registerRoute and mockRouter called twice')
    assert.equal(names[0], 'dashboard', 'name space has been reset so name doesnt not contain parent');
  });
});
