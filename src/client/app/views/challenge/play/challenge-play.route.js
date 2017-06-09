import ChallengePlay from './challenge-play.svelte';
import DB from '../../../shared/DB';
import Header from '../../../shared/Header.service';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.play',
    route: '/challenge/:id/play',
    template: ChallengePlay,
    resolve(data, params)
    {
      return DB.local.challenges.get(params.id)
        .then(challenge => ({ challenge }))
      ;
    },
    activate()
    {
      Header.emit('viewTitle', '');
      Header.emit('transparent', true);

      stateRouter.once('afterDestroyState', () =>
      {
        Header.emit('transparent', false);
      });
    }
  });
}
