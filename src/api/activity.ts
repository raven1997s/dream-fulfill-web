import request from '../utils/request';
import { baseUrl } from './common';


export const getActivityList =  async  (params:any) => {
    const result = await request({
      url:  baseUrl + '/activity/pageQueryActivityList', 
      method: 'post',
      data: params
    })

    return result.data;
}

export const updateActivity =  async  (params:any) => {
    const result = await request({
      url: baseUrl + '/activity/updateActivity', 
      method: 'post',
      data: params
    })
    return result.data;
}

export const addActivity =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/addActivity', 
    method: 'post',
    data: params
  })
  return result.data;
}

export const deleteActivity =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/deleteActivity', 
    method: 'post',
    data: params
  })
  return result.data;
}


export const getActivityStatList =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/stat/pageQueryActivityStatList', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const getDrawRecordStatList =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/drawRecord/pageQueryDrawRecordList', 
    method: 'post',
    data: params
  })

  return result.data;
}
export const selectActivityInfo =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/selectActivityInfo', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const findCurrentActivityStatList =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/stat/findCurrentActivityStatList', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const doLottery =  async  (params:any) => {
  const result = await request({
    url: baseUrl + '/activity/doLottery', 
    method: 'post',
    data: params
  })

  return result.data;
}