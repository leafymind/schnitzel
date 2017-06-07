import PouchDB from 'pouchdb-browser';
import Find from 'pouchdb-find';
import Authentication from 'pouchdb-authentication';

PouchDB.plugin(Find);
PouchDB.plugin(Authentication);

const remote = {};
const local = {};
const dbs = ['challenges', 'quests'];

dbs.forEach(db =>
{
  remote[db] = new PouchDB('https://schnitzel.freiken-douhl.de/db/' + db);
  local[db] = new PouchDB(db);

  local[db].sync(remote[db]) // TODO sync only when logged-in otherwise only download
    .on('complete', () =>
    {
      console.log('Synced [' + db + '] database.');
    })
    .on('error', (err) =>
    {
      console.log('Failed to sync [' + db + '] database.');
      console.error(err);
    })
  ;
});

local.quests.createIndex({ index: { fields: ['challenge'] } });

export default { remote, local };
