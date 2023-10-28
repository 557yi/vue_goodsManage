import axios from 'axios';
import { req ,url1,url2} from './axiosFun';
// let url1 = 'http://192.168.43.226:8082'
/**
 * 商品管理
 **/
// 商品管理-获取商品管理列表
export const GoodsList = (params) => { return req("get",url1+"/product/manageList?page="+params.page+"&PageSize="+params.PageSize) };
export const GoodsListsearch = (params) => { return req("get",url1+"/product/manageList?page="+params.page+"&PageSize="+params.PageSize+"&name="+params.name) };

// 商品管理-保存商品管理
export const GoodsSave = (params) => { return req("post", url1+"/product/add", params) };
// 商品管理-删除商品管理
export const GoodsDelete = (id) => { return req('delete',url1+"/product/delete?id="+id)}

/**
 * 机器信息管理 
 **/
// 机器信息管理-获取机器信息管理列表
export const MachineList = (params) => { return req("post", "/api/Machine/list", params) };
// 机器信息管理-保存机器信息管理
export const MachineSave = (params) => { return req("post", "/api/Machine/save", params) };
// 机器信息管理-删除机器信息管理
export const MachineDelete = (params) => { return axios.delete("/api/Machine/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 货道信息管理
 **/
// 货道信息管理-获取获取货道信息管理列表
export const MachineAisleList = (params) => { return req("post", "/api/MachineAisle/list", params) };
// 货道信息管理-删除货道信息管理
export const MachineAisleDelete = (params) => { return axios.delete("/api/MachineAisle/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 货道信息管理-保存货道信息管理
export const MachineAisleRsave = (params) => { return req("post", "/api/MachineAisle/save", params) };