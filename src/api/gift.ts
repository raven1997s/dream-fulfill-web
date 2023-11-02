import request from '../utils/request';
import { baseUrl } from './common';

export const getGiftList =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/gift/pageQueryGiftList', 
      method: 'post',
      data: params
    })

    return result.data;
}

export const updateGift =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/gift/updateGift', 
      method: 'post',
      data: params
    })
    return result.data;
}

export const addGift =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/gift/addGift', 
    method: 'post',
    data: params
  })
  return result.data;
}

export const deleteGift =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/gift/deleteGift', 
    method: 'post',
    data: params
  })
  return result.data;
}

