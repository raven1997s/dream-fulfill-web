import request from '../utils/request';
import { baseUrl } from './common';

export const getSpecialDateList =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/holiday/pageQuerySpecialDateList', 
      method: 'post',
      data: params
    })

    return result.data;
}

export const updateSpecialDate =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/holiday/updateSpecialDate', 
      method: 'post',
      data: params
    })
    return result.data;
}

export const addSpecialDate =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/holiday/addSpecialDate', 
    method: 'post',
    data: params
  })
  return result.data;
}

export const deleteSpecialDate =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/holiday/deleteSpecialDate', 
    method: 'post',
    data: params
  })
  return result.data;
}

