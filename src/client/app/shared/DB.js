import PouchDB from 'pouchdb-core';
import AdapterIdb from 'pouchdb-adapter-idb';
import AdapterHttp from 'pouchdb-adapter-http';
import Replication from 'pouchdb-replication';
import Validation from 'pouchdb-validation';
import Authentication from 'pouchdb-authentication';

PouchDB
  .plugin(AdapterIdb)
  .plugin(AdapterHttp)
  .plugin(Replication)
  .plugin(Validation)
  .plugin(Authentication)
;

const remote = {};
const local = {};
const dbs = ['challenges', 'quests', 'story'];

dbs.forEach(db =>
{
  remote[db] = new PouchDB('https://schnitzel.freiken-douhl.de/db/' + db, { skip_setup: true });
  local[db]  = new PouchDB(db);

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

export default { remote, local };
