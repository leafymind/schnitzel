import PouchDB from 'pouchdb-browser';
import Find from 'pouchdb-find';
import Validation from 'pouchdb-validation';
import Authentication from 'pouchdb-authentication';

PouchDB.plugin(Find);
PouchDB.plugin(Validation);
PouchDB.plugin(Authentication);

const remote = {};
const local = {};
const dbs = ['challenges', 'quests'];

dbs.forEach(db =>
{
  remote[db] = new PouchDB('https://schnitzel.freiken-douhl.de/db/' + db, { skip_setup: true });
  local[db] = new PouchDB(db);

  function log(msg, ...rest)
  {
    console.log(`[${db}] ${msg}`, rest);
  }

  local[db].sync(remote[db], { live: true, retry: true }) // TODO sync only when logged-in otherwise only download.on('change', function (info) {
    .on('change', info => log('Change.', info))
    .on('denied', err => log('Denied.', err))
    .on('error', err => log('Failed to sync.', err))
    .on('complete', () => log('Synced.'))
  ;
});

local.quests.createIndex({ index: { fields: ['challenge'] } });

export default { remote, local };

window.PouchDB = PouchDB;
