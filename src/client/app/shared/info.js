function getMobileOperatingSystem()
{
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent))
  {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  {
    return 'iOS';
  }

  return '';
}

const info = {
  appName: 'Schnitzel',
  system: getMobileOperatingSystem(),
  hero: 'Leon'
};

Object.defineProperties
(
  info,
  {
    name:
    {
      enumerable: true,
      get()
      {
        return localStorage.getItem('username');
      },
      set(name)
      {
        return localStorage.setItem('username', name);
      }
    },
    longDate:
    {
      enumerable: true,
      get()
      {
        return (new Date()).toLocaleDateString(navigator.language, { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
      }
    },
    longTime:
    {
      enumerable: true,
      get()
      {
        return (new Date()).toLocaleTimeString(navigator.language, { hour12: true, hour: 'numeric' });
      }
    }
  }
);

export default info;
