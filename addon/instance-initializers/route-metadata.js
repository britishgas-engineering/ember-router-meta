import dsl from '../utils/dsl-route-extend';

export function initialize (instance) {
  let routeMetaData = instance.lookup('service:route-metadata');
  let config = instance.container.lookupFactory('config:environment');
  if (config && config.emberRouterMeta && config.emberRouterMeta.defaultAttrs) {
    routeMetaData.setAttrs(config.emberRouterMeta.defaultAttrs);
  }
  dsl.init(routeMetaData);
}

export default {
  name: 'route-metadata',
  initialize
};
