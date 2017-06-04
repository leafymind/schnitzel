import ChallengePlay from './challenge-play.svelte';
import DB from '../../../shared/DB.js';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.play',
    route: '/challenge/:id/play',
    template: ChallengePlay,
    resolve(data, params)
    {
      return DB.challenges.get(params.id)
        .then(challenge => ({ challenge }))
      ;
    }
  });
}
