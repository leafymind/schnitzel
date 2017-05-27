import ChallengePlay from './challenge-play.svelte';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.play',
    route: '/challenge/:id/play',
    template: ChallengePlay,
    resolve(data, params)
    {
      return Promise.resolve(params);
    }
  });
}
