import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import DB from './app/shared/DB';
import { stateRouter } from './app/shared/Router';
import AppRoute from './app/app.route';

if (process.env.ENV === 'production')
{
  const snackbarContainer = document.getElementById('snackbar');

  OfflinePluginRuntime.install
  ({
    onInstalled()
    {
      console.log('installiert');
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

if (Notification.permission !== 'denied')
{
  Notification.requestPermission();
}

DB.isDataAvailable()
  .then(() =>
  {
    return navigator.onLine || Promise.reject('update');
  })
  .catch(() =>
  {
    return DB.download();
  })
  .then(() =>
  {
    DB.download();
    AppRoute(stateRouter);
    stateRouter.evaluateCurrentRoute('app');
  })
;
