import 'svelte/shared';
import 'svelte-state-renderer';
import 'abstract-state-router';
import 'material-design-lite'; // TODO: import only used components
import 'pouchdb-core';
import 'pouchdb-adapter-idb'; // TODO think about adding fallback for Safari
import 'pouchdb-adapter-http';
import 'pouchdb-replication';
import 'pouchdb-validation';
import 'pouchdb-authentication';
import 'hammerjs';

if (process.env.ENV === 'production')
{
  require('offline-plugin/runtime');
}
