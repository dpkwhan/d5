import request from '@/utils/request';
import { IListItemData } from './data.d';

export async function queryFakeList(params: IListItemData) {
  return request('/api/fake_list', {
    params,
  });
}
