import { stateRouter } from './app/shared/Router';
import AppRoute from './app/app.route';

AppRoute(stateRouter);

stateRouter.evaluateCurrentRoute('app');

if (process.env.ENV === 'production')
{
  const OfflinePluginRuntime = require('offline-plugin/runtime');

  const snackbarContainer = document.getElementById('snackbar');
  const showSnackbar = snackbarContainer.MaterialSnackbar.showSnackbar;

  OfflinePluginRuntime.install
  ({
    onInstalled()
    {
      showSnackbar({ message: 'App installiert.' });
    },

    onUpdateReady()
    {
      showSnackbar
      ({
        message: 'Neue Version ist bereit zur Installation.',
        actionText: 'Aktualisieren',
        actionHandler: () => OfflinePluginRuntime.applyUpdate(),
        timeout: 5000
      });
    },

    onUpdated()
    {
      showSnackbar({ message: 'Aktualisierung erfolgreich installiert.' });
    },

    onUpdateFailed()
    {
      showSnackbar({ message: 'Aktualisierung fehlgeschlagen.' });
    }
  });
}
