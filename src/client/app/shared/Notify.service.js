import info from './info';

// let NotificationAPI = (...params) => new Notification(...params);
// let lastInstance;

export default function notify(body, from, badge = 'message')
{
  if (document.hasFocus())
  {
    window.navigator.vibrate(200);

    // if (lastInstance)
    // {
    //   lastInstance.close();
    // }
  }
  else if (Notification.permission === 'granted')
  {
    // if (lastInstance)
    // {
    //   body = lastInstance.body + '\n' + body;
    //   lastInstance.close();
    // }

    try
    {
      navigator.serviceWorker.ready
        .then(registration =>
        {
          return registration
            .showNotification
            (
              from ? [from, info.appName].join(' · ') : info.appName,
              {
                body,
                icon: 'assets/img/logo.png',
                badge: `https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_${badge}_black_24px.svg`,
                vibrate: 500,
                requireInteraction: true
              }
            )
            .then(() => registration.getNotifictions())
          ;
        })
        .then(console.log.bind(console))
        .catch(console.error.bind(console))
      ;

      // lastInstance.addEventListener('click', () =>
      // {
      //   lastInstance.close();
      //   window.focus();
      // });
      //
      // lastInstance.addEventListener('close', (e) =>
      // {
      //   if (lastInstance === e.target)
      //   {
      //     lastInstance = null;
      //   }
      // });
    }
    catch (err)
    {
      console.error(err);
    }
  }
}

if (Notification.permission !== 'denied')
{
  window.Notification
    .requestPermission()
    // .then(result => result === 'granted' && navigator.serviceWorker.ready)
    // .then(registration => NotificationAPI = registration.showNotification || NotificationAPI)
  ;
}

navigator.serviceWorker.ready.then(console.log.bind(console));
