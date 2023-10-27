import request from '../utils/request';


export const getActivityList =  async  (params:any) => {
    const result = await request({
      url: 'http://localhost:8080/activity/pageQueryActivityList', 
      method: 'post',
      data: params
    })

    return result.data;
}

export const updateActivity =  async  (params:any) => {
    const result = await request({
      url: 'http://localhost:8080/activity/updateActivity', 
      method: 'post',
      data: params
    })
    return result.data;
}

export const addActivity =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/addActivity', 
    method: 'post',
    data: params
  })
  return result.data;
}

export const deleteActivity =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/deleteActivity', 
    method: 'post',
    data: params
  })
  return result.data;
}

