import ajax from './ajax'

const BASE = '/api'

//根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE+`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqFoodCategories = () => ajax({
  method: 'GET',
  url: BASE + '/index_category'
})

//根据经纬度获取商铺列表

export const reqShopList = ({longitude, latitude}) => ajax({
  url: BASE + '/shops',
  params: {longitude, latitude}
})