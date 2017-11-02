import dsl from '../utils/dsl-route-extend';

export function initialize (instance) {
  let routeMetaData = instance.lookup('service:route-metadata');
  dsl.init(routeMetaData);
}

export default {
  name: 'route-metadata',
  initialize
};
