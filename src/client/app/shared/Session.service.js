import DB from './DB';

let sessionCache;

class Session
{
  constructor()
  {
    this.getRemote();
  }

  getRemote()
  {
    return DB.remote.challenges.getSession().then(session => sessionCache = session);
  }

  getCachedUser()
  {
    return sessionCache.userCtx;
  }
}

export default new Session();
