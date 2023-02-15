import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/route-metadata';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import Resolver from 'ember-resolver';
import config from 'dummy/config/environment';

module('Unit | Instance Initializer | route metadata', function (hooks) {
  hooks.beforeEach(function () {
    this.TestApplication = class TestApplication extends Application {
      modulePrefix = config.modulePrefix;
      podModulePrefix = config.podModulePrefix;
      Resolver = Resolver;
    };
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize,
    });

    this.application = this.TestApplication.create({ autoboot: false });
    this.appInstance = this.application.buildInstance();
  });

  hooks.afterEach(function () {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  test('Ember Router Meta enviroment varibles set', function (assert) {
    let callback = sinon.spy();

    this.appInstance.resolveRegistration = function () {
      return {
        emberRouterMeta: {
          defaultAttrs: ['pageName', 'section', 'pageType'],
        },
      };
    };

    this.appInstance.lookup = function () {
      return {
        setAttrs() {
          callback();
        },
        _registerRoute() {
          return null;
        },
      };
    };

    initialize(this.appInstance);
    assert.true(callback.called, 'callback should run once');
  });

  test('Ember Router Meta enviroment varibles not set', function (assert) {
    let callback = sinon.spy();

    this.appInstance.lookup = function () {
      return {
        setAttrs() {
          callback();
        },
        _registerRoute() {
          return null;
        },
      };
    };

    initialize(this.appInstance);
    assert.false(callback.called, 'callback should not run');
  });
});
