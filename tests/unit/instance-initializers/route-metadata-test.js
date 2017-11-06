import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/route-metadata';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | route metadata', {
  beforeEach() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

test('Ember Router Meta enviroment varibles set', function(assert) {
  let callback = sinon.spy()

  this.appInstance.container = {
    resolveRegistration() {
      return {
        emberRouterMeta: {
          defaultAttrs: [
            'pageName',
            'section',
            'pageType'
          ]
        }
      };
    }
  };

  this.appInstance.lookup = function() {
    return {
      setAttrs () {
        callback()
      },
      _registerRoute() {
        return null;
      }
    }
  };

  initialize(this.appInstance);
  assert.equal(callback.called, true, 'callback should run once');
});

test('Ember Router Meta enviroment varibles not set', function(assert) {
  let callback = sinon.spy()

  this.appInstance.lookup = function() {
    return {
      setAttrs () {
        callback()
      },
      _registerRoute() {
        return null;
      }
    }
  };

  initialize(this.appInstance);
  assert.equal(callback.called, false, 'callback should not run');
});
