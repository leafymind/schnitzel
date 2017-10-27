import DB from './DB';

let sessionCache;

class Session
{
  constructor()
  {
    if (navigator.onLine)
    {
      this.getRemote();
    }
  }

  getRemote()
  {
    return DB.remote.session.getSession().then(session => sessionCache = session);
  }

  getCachedUser()
  {
    return sessionCache.userCtx;
  }
}

export default new Session();
