import { Store } from './';

const store = new Store({ store: window.localStorage, crypto: false });

// TODO: 应用特殊本地存储定义

export const getToken = () => {
  store.get('USER_TOKEN');
};

export const getOrg = (): { orgName: string; orgNo: string } | null => {
  return store.get('currentOrg');
};
