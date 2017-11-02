import EmberObject from '@ember/object';
import MetaDataMixin from 'ember-router-meta/mixins/meta-data';
import { module, test } from 'qunit';

module('Unit | Mixin | meta data');

// Replace this with your real tests.
test('it works', function(assert) {
  let MetaDataObject = EmberObject.extend(MetaDataMixin);
  let subject = MetaDataObject.create();
  assert.ok(subject);
});
