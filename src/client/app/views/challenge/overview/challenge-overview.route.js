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
      return DB.challenges.allDocs({ include_docs: true, descending: true })
        .then(data => ({ challenges: data.rows.map(row => row.doc) }))
      ;
    }
  });
}
