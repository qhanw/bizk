import { local as store } from './core';

// TODO: 应用特殊本地存储定义

export default store;

export const getToken = () => {
  store.get('USER_TOKEN');
};

export const getOrg = (): { orgName: string; orgNo: string } | null => {
  return store.get('currentOrg');
};
