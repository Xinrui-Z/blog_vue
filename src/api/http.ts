import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.baseURL = '/api'

const service = axios.create({
    timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(

    (config: any) => {
        const token = sessionStorage.getItem('TOKEN')
        // let token: string | null = sessionStorage.getItem('TOKEN')
        if (token) {
            console.log('Token in request interceptor:', token);
            config.headers['token'] = token
            console.log('token:',config.headers['token'])
        }
        return config

    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: any) => {
        console.log('interceptors response data:', response.data); // Add this line
        if (response.data.code === 200) {
            return response;
        } else {
            return Promise.reject(new Error(response.data.message));
        }
    },
    error => {
        console.log('err', error);
        if (error.response && error.response.status === 400) {
            ElMessage.error(error.message);
        } else {
            ElMessage.error('服务器请求错误，请稍后再试');
        }
        return Promise.reject(error);
    }
);


export const request = (options: any) => {
    return new Promise((resolve, reject) => {
        // 请求处理
        service(options)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default request
