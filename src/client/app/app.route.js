import App from './app.svelte';

import ChallengeOverviewRoute from './views/challenge/overview/challenge-overview.route';
import ChallengeCreateRoute from './views/challenge/create/challenge-create.route';

export default function(stateRouter)
{
  stateRouter.addState
  ({
		name: 'app',
		route: '/',
    template: App,
		defaultChild: 'overview',
		// resolve: function resolve(data, parameters, cb) {
		// 	const currentUser = model.getCurrentUser()
    //
		// 	if (currentUser.name) {
		// 		cb(null, {
		// 			currentUser
		// 		})
		// 	} else {
		// 		cb.redirect('login')
		// 	}
		// },
		// activate: function({ domApi: svelte }) {
		// 	svelte.on('logout', function() {
		// 		model.saveCurrentUser(null)
		// 		stateRouter.go('login')
		// 	})
		// }
	});

  ChallengeOverviewRoute(stateRouter);
  ChallengeCreateRoute(stateRouter);
}
