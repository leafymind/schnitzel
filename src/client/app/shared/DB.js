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

const API = 'https://schnitzel.freiken-douhl.de/db/';
const dbs = ['story'];
const remote = {};
const local = {};

dbs.forEach(db =>
{
  remote[db] = new PouchDB(API + db, { skip_setup: true });
  local[db]  = new PouchDB(db);
});

remote.session = new PouchDB(API + '/', { skip_setup: true });

export default {
  remote,
  local,
  isDataAvailable()
  {
    return Promise.all(dbs.map(db => local[db].info()
      .then(info => info.doc_count || Promise.reject() )))
    ;
  },
  download()
  {
    return Promise.all(dbs.map(db => remote[db].replicate.to(local[db], { retry: true })));
  }
};
