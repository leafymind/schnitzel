import ChallengeOverview from './challenge-overview.svelte';
import DB from '../../../shared/DB';
import Header from '../../../shared/Header.service';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.overview',
    route: '/overview',
    template: ChallengeOverview,
    resolve()
    {
      return DB.local.challenges.allDocs({ include_docs: true, descending: true })
        .then(data =>
          ({
            challenges: data.rows
              .filter(row => !row.id.startsWith('_design'))
              .map(row => row.doc)
          })
        )
      ;
    },
    activate()
    {
      Header.emit('viewTitle', 'Übersicht');
    }
  });
}
