import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const challenges = new PouchDB('challenges');
const quests = new PouchDB('quests');

quests.createIndex({ index: { fields: ['challenge'] } });

export default { challenges, quests };

window.PouchDB = PouchDB;
