import ChallengeOverview from './challenge-overview.svelte';
import DB from '../../../shared/DB.js'

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
        }))
      ;
    },
    activate()
    {
      componentHandler.upgradeAllRegistered();
    }
  });
}
