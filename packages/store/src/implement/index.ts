import engine from './engine';

import local from './storages/localStorage';
import session from './storages/sessionStorage';

const plugins: any = [];

const store = engine.createStore(local, plugins);
store.session = engine.createStore(session, plugins);

export default store;
