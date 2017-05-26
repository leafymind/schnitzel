import ChallengeOverview from './challenge-overview.svelte';

export default function(stateRouter)
{
  stateRouter.addState
  ({
		name: 'app.overview',
		route: '/',
    template: ChallengeOverview
	});
}
