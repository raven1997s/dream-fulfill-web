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


export const getActivityStatList =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/stat/pageQueryActivityStatList', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const getDrawRecordStatList =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/drawRecord/pageQueryDrawRecordList', 
    method: 'post',
    data: params
  })

  return result.data;
}
export const selectActivityInfo =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/selectActivityInfo', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const findCurrentActivityStatList =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/stat/findCurrentActivityStatList', 
    method: 'post',
    data: params
  })

  return result.data;
}

export const doLottery =  async  (params:any) => {
  const result = await request({
    url: 'http://localhost:8080/activity/doLottery', 
    method: 'post',
    data: params
  })

  return result.data;
}