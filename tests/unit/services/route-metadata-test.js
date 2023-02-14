import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | route metadata', function (hooks) {
  setupTest(hooks);

  test('_registerRoute - new route', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      route = 'example';

    service._registerRoute(route);

    assert.ok(service.get('_routes'), 'route has been added');
  });

  test('_registerRoute - check for existing route', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      route = 'example';
    assert.expect(1);
    service._registerRoute(route);

    try {
      service._registerRoute(route);
    } catch (e) {
      assert.equal(
        e,
        `ember-router-meta: Route ${route} has already been registered`,
        'Expect route already registered error'
      );
    }
  });

  test('editRoute - Invalid route error', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      route = 'example';
    assert.expect(1);
    try {
      service.editRoute(route);
    } catch (e) {
      assert.equal(
        e,
        `ember-router-meta: Route: ${route} was not found`,
        'Route not found error should be shown'
      );
    }
  });

  test('editRoute - check for edited route', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      _routes = {
        example: {},
      },
      route = 'example',
      key = 'pageName',
      val = 'Dashboard';
    service.set('_routes', _routes);
    service.editRoute(route, key, val);
    assert.equal(
      service.getRoute(route).pageName,
      val,
      'Route has been edited'
    );
  });

  test('getMetaDataByRoute - route with all attributes', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      attrsNames = ['pageName', 'pageType', 'section'],
      _routes = {
        example: {
          pageName: 'Dashboard',
          section: 'My Account',
          pageType: 'Account Management',
        },
      },
      example = {
        pageName: 'Dashboard',
        section: 'My Account',
        pageType: 'Account Management',
      },
      route = 'example';
    service.set('_routes', _routes);
    service.setAttrs(attrsNames);

    let metadata = service.getMetaDataByRoute(route);

    assert.deepEqual(metadata, example, 'found the correct meta data');
  });

  test('getMetaDataByRoute - get attributes from parent', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      attrsNames = ['pageName', 'pageType', 'section'],
      _routes = {
        example: {
          pageType: 'Account Management',
        },
        'example.dashboard': {
          section: 'Booking',
        },
        'example.dashboard.book.appointment': {
          pageName: 'Booking page',
        },
      },
      route = 'example.dashboard.book.appointment',
      mockData = {
        pageName: 'Booking page',
        section: 'Booking',
        pageType: 'Account Management',
      };
    service.set('_routes', _routes);
    service.setAttrs(attrsNames);
    let metadata = service.getMetaDataByRoute(route);

    assert.deepEqual(metadata, mockData, 'found the correct meta data');
  });

  test('getMetaDataByRoute - get attributes from parent, missing info', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      attrsNames = ['pageName', 'pageType', 'section'],
      _routes = {
        example: {
          pageType: 'Account Management',
        },
        'example.dashboard.book.appointment': {
          pageName: 'Booking page',
        },
      },
      route = 'example.dashboard.book.appointment';
    service.set('_routes', _routes);
    service.setAttrs(attrsNames);
    assert.expect(1);
    let metadata = service.getMetaDataByRoute(route);
    assert.deepEqual(
      metadata,
      {
        pageName: 'Booking page',
        pageType: 'Account Management',
        section: undefined,
      },
      'meta data contains all attributes'
    );
  });

  test('getMetaDataByRoute - null/undefined route', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      attrsNames = ['pageName', 'pageType', 'section'],
      _routes = {
        example: {
          pageType: 'Account Management',
        },
        'example.dashboard.book.appointment': {
          pageName: 'Booking page',
        },
      },
      route = null;
    service.set('_routes', _routes);
    service.setAttrs(attrsNames);
    assert.expect(1);
    try {
      service.getMetaDataByRoute(route);
    } catch (e) {
      assert.equal(e, `ember-router-meta: Route is Null or undefined`);
    }
  });

  test('getMetaDataByRoute - Route doesnt exist', function (assert) {
    let service = this.owner.lookup('service:route-metadata'),
      attrsNames = ['pageName', 'pageType', 'section'],
      _routes = {
        example: {
          pageName: 'test',
        },
      },
      route = 'test.name';
    service.set('_routes', _routes);
    service.setAttrs(attrsNames);
    assert.equal(
      service.getMetaDataByRoute(route),
      null,
      'If the route is not found null is returned'
    );
  });

  test('setAttrs - null', function (assert) {
    assert.expect(1);
    let service = this.owner.lookup('service:route-metadata');

    try {
      service.setAttrs(null);
    } catch (e) {
      assert.equal(
        e,
        'ember-router-meta: Attrs could not be set, the array must contain at least one attribute',
        'Correct Error thrown'
      );
    }
  });

  test('setAttrs - Empty Array', function (assert) {
    assert.expect(1);
    let service = this.owner.lookup('service:route-metadata');

    try {
      service.setAttrs([]);
    } catch (e) {
      assert.equal(
        e,
        'ember-router-meta: Attrs could not be set, the array must contain at least one attribute',
        'Correct Error thrown'
      );
    }
  });
});
