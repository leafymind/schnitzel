import ChallengeOverview from './challenge-overview.svelte';
// import DB from '../../../shared/DB';
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
      return Promise.resolve
      ({
        challenges:
        [
          {
            _id: '3cac569326fb0852ea6a28e3a600040b',
            create_date: Date.now(),
            title: 'Nachricht von Unbekannt',
            desc: 'Eine rätselhafte Nachricht von einem bisher unbekanntem Absender taucht auf.',
            author: 'benni'
          }
        ]
      });
      // return DB.local.challenges.allDocs({ include_docs: true, descending: true })
      //   .then(data =>
      //     ({
      //       challenges: data.rows
      //         .filter(row => !row.id.startsWith('_design'))
      //         .map(row => row.doc)
      //     })
      //   )
      // ;
    },
    activate()
    {
      Header.emit('viewTitle', 'Übersicht');
    }
  });
}
