import 'svelte/shared';
import 'svelte-state-renderer';
import 'abstract-state-router';
import 'material-design-lite'; // TODO: import only used components
import 'pouchdb-browser'; // TODO: use custom builds
import 'pouchdb-find';
import 'pouchdb-validation';
import 'pouchdb-authentication';
import 'hammerjs';

if (process.env.ENV === 'production')
{
  require('offline-plugin/runtime');
}
