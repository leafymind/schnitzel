export function tap(element, callback)
{
  let startTime;

  function touchstart()
  {
    startTime = Date.now();
  }

  function touchend(e)
  {
    if (startTime)
    {
      if (Date.now() - startTime < 500)
      {
        callback(e);
      }

      startTime = null;
    }
  }

  element.addEventListener('touchstart', touchstart, { passive: true });
  element.addEventListener('touchend', touchend);

  return {
    teardown()
    {
      element.removeEventListener('touchstart', touchstart);
      element.removeEventListener('touchend', touchend);
    }
  };
}

export function longpress(element, callback)
{
  let timer;

  function touchstart(e)
  {
    timer = setTimeout(() => callback(e), 500);
  }

  function touchend()
  {
    if (timer)
    {
      clearTimeout(timer);
      timer = null;
    }
  }

  element.addEventListener('touchstart', touchstart, { passive: true });
  element.addEventListener('touchend', touchend);

  return {
    teardown()
    {
      element.removeEventListener('touchstart', touchstart);
      element.removeEventListener('touchend', touchend);
    }
  };
}
