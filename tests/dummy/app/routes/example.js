import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	routeMetadata: service(),
	// Service: routeMetadata
	router: service(),
	afterModel() {
		console.log(this.router.get('currentRouteName'));
		// const rouetData = this.get('routeMetadata').getMetaDataByRoute(this.currentRouteName);
		// console.log(rouetData);
	}
});
