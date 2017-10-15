import { stateRouter } from './app/shared/Router';
import AppRoute from './app/app.route';

AppRoute(stateRouter);

stateRouter.evaluateCurrentRoute('app');

if (process.env.ENV === 'production')
{
  const OfflinePluginRuntime = require('offline-plugin/runtime');

  const snackbarContainer = document.getElementById('snackbar');

  OfflinePluginRuntime.install
  ({
    onInstalled()
    {
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'App installiert.' });
    },

    onUpdateReady()
    {
      snackbarContainer.MaterialSnackbar.showSnackbar
      ({
        message: 'Neue Version ist bereit zur Installation.',
        actionText: 'Aktualisieren',
        actionHandler: () => OfflinePluginRuntime.applyUpdate(),
        timeout: 5000
      });
    },

    onUpdated()
    {
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'Aktualisierung erfolgreich installiert.' });
    },

    onUpdateFailed()
    {
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: 'Aktualisierung fehlgeschlagen.' });
    }
  });
}
