import axios from 'axios';

const url1 = 'http://192.168.43.226:8082'
const url2 = 'http://192.168.43.226:8083'
// const url1 = 'http://172.20.10.3:8082'
// const url2 = 'http://172.20.10.3:8083'
// 登录请求方法
const Logreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            // "req":localStorage.getItem("token")
        },
        data: params,
       
    }).then(res => res.data);
};

const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            "token":localStorage.getItem("token")
        },
        data: params,
       
    }).then(res => res.data);
};
const req2 = (method, url) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            "token":localStorage.getItem("token")
        },
        
       
    }).then(res => res.data);
};
// 通用公用方法
const req1 = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};




export {
    Logreq,
    req,
    url1,
    url2,
    req2
}