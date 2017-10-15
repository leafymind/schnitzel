import 'svelte/shared';

import 'abstract-state-router';
import 'svelte-state-renderer';

import 'hammerjs'; // TODO custom build (remove mouse events)?

import 'material-design-lite/src/mdlComponentHandler';
import 'material-design-lite/src/button/button';
// import 'material-design-lite/src/checkbox/checkbox';
// import 'material-design-lite/src/icon-toggle/icon-toggle';
// import 'material-design-lite/src/menu/menu';
// import 'material-design-lite/src/progress/progress';
// import 'material-design-lite/src/radio/radio';
// import 'material-design-lite/src/slider/slider';
import 'material-design-lite/src/snackbar/snackbar';
// import 'material-design-lite/src/spinner/spinner';
// import 'material-design-lite/src/switch/switch';
// import 'material-design-lite/src/tabs/tabs';
import 'material-design-lite/src/textfield/textfield';
// import 'material-design-lite/src/tooltip/tooltip';
import 'material-design-lite/src/layout/layout';
// import 'material-design-lite/src/data-table/data-table';
import 'material-design-lite/src/ripple/ripple';

import 'pouchdb-core';
import 'pouchdb-adapter-idb'; // TODO think about adding fallback for Safari
import 'pouchdb-adapter-http';
import 'pouchdb-replication';
import 'pouchdb-validation';
import 'pouchdb-authentication';

if (process.env.ENV === 'production')
{
  require('offline-plugin/runtime');
}
