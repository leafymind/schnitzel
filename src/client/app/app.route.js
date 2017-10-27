import App from './app.svelte';

import LoginRoute from './views/login/login.route';
import ChallengeOverviewRoute from './views/challenge/overview/challenge-overview.route';
import ChallengeCreateRoute from './views/challenge/create/challenge-create.route';
import ChallengePlayRoute from './views/challenge/play/challenge-play.route';
import ConversationRoute from './views/conversation/conversation.route';

import Header from './shared/Header.service';

export default function(stateRouter)
{
  stateRouter.on('afterCreateState', () =>
  {
    componentHandler.upgradeAllRegistered();
  });

  stateRouter.addState
  ({
    name: 'app',
    template: App,
    defaultChild: 'overview',
    activate(e)
    {
      Header.on('viewTitle', viewTitle =>
      {
        e.domApi.set({ viewTitle });
      });
    }
  });

  LoginRoute(stateRouter);
  ChallengeOverviewRoute(stateRouter);
  ChallengeCreateRoute(stateRouter);
  ChallengePlayRoute(stateRouter);
  ConversationRoute(stateRouter);

  stateRouter.evaluateCurrentRoute('app.overview');
}
