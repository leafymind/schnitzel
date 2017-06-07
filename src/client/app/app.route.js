import App from './app.svelte';

import LoginRoute from './views/login/login.route';
import ChallengeOverviewRoute from './views/challenge/overview/challenge-overview.route';
import ChallengeCreateRoute from './views/challenge/create/challenge-create.route';
import ChallengePlayRoute from './views/challenge/play/challenge-play.route';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app',
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

  LoginRoute(stateRouter);
  ChallengeOverviewRoute(stateRouter);
  ChallengeCreateRoute(stateRouter);
  ChallengePlayRoute(stateRouter);
}
