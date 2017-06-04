import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const exportedDbs = {};
const dbs = ['challenges', 'quests'];

dbs.forEach(db =>
{
  const remoteDB = new PouchDB('https://schnitzel.freiken-douhl.de/db/' + db);
  const localDB = exportedDbs[db] = new PouchDB(db);

  localDB.sync(remoteDB)
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

exportedDbs.quests.createIndex({ index: { fields: ['challenge'] } });

export default exportedDbs;

// window.PouchDB = PouchDB;
