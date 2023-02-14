/* eslint-disable ember/no-new-mixins */
/* eslint-disable ember/no-mixins */
import EmberObject from '@ember/object';
import MetaDataMixin from 'ember-router-meta/mixins/meta-data';
import { module, test } from 'qunit';

module('Unit | Mixin | meta data', function () {
  test('editMetaData - Check that it edits meta', function (assert) {
    let MetaDataObject = EmberObject.extend(MetaDataMixin),
      subject = MetaDataObject.create({
        routeMetadata: {
          route: {
            pageName: 'Test Page',
          },
          editRoute(route, key, val) {
            this.route[key] = val;
          },
          getMetaDataByRoute() {
            return this.route;
          },
        },
      }),
      route = 'example.route',
      expectedResult = 'New Page Name';

    let result = subject.editMetaData(route, 'pageName', 'New Page Name');
    assert.strictEqual(
      expectedResult,
      result.pageName,
      'Route has correctly changed and been returned'
    );
  });

  test('editMetaData - add data to route without tag', function (assert) {
    let MetaDataObject = EmberObject.extend(MetaDataMixin),
      subject = MetaDataObject.create({
        routeMetadata: {
          route: {
            pageName: 'Test Page',
          },
          editRoute(route, key, val) {
            this.route[key] = val;
          },
          getMetaDataByRoute() {
            return this.route;
          },
        },
      }),
      route = 'example.route',
      expectedResult = 'Section Name';

    let result = subject.editMetaData(route, 'section', 'Section Name');
    assert.strictEqual(
      expectedResult,
      result.section,
      'New meta tag section has been added to route'
    );
  });
});
