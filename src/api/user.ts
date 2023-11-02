import request from '../utils/request';
import { baseUrl } from './common';

export const getUserList =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/user/pageQueryUserList', 
      method: 'post',
      data: params
    })

    return result.data;
}

export const updateUser =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/user/updateUser', 
      method: 'post',
      data: params
    })
    return result.data;
}

export const addUser =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/user/addUser', 
    method: 'post',
    data: params
  })
  return result.data;
}

