import ChallengeCreate from './challenge-create.svelte';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.create',
    route: '/new',
    template: ChallengeCreate
  });
}
