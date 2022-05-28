/* eslint-disable class-methods-use-this */
import Constant from '@utils/constant';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

class AxiosServer {
  private instance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-type': 'application/json',
      },
    });
    instance.interceptors.response.use(this.handelSuccess, this.handelError);
    this.instance = instance;
  }

  setTokenRequest(token: string) {
    if (token) {
      this.instance.defaults.headers.common['x-access-token'] = token;
    }
  }

  //   getFullUrl(url) {
  //     if (!url.startsWith('/')) {
  //       url = '/' + url;
  //     }
  //     const timeStamp = Date.now();
  //     let hash_key = `${process.env.REACT_APP_API_KEY}_${timeStamp}_${url}`;
  //     this.instance.defaults.headers.common['hash_key'] = crypto.MD5(hash_key).toString();
  //     this.instance.defaults.headers.common['timestamp'] = timeStamp;
  //     return `${process.env.REACT_APP_API_URL}` + url;
  //   }

  handelSuccess(response) {
    if (Constant.code.ERROR_RESPONSE === response.data?.code) {
      toast.warn(response.data?.message);
      // NotificationManager.warning(response.data?.msg, 'Warning');
    } else if (Constant.code.ERROR_AUTHENTICATION === response.data?.code) {
      toast.warn('Your session is expire');
      // Promise.all([storeWrapper.dispatch(logout())]);
    }
    return response.data;
  }

  handelError(e) {
    const error = e.toJSON();
    if (error?.status === Constant.code.ERROR_AUTHENTICATION) {
      toast.error('Truy cập bị từ chối, vui lòng thử lại');
    } else {
      toast.error(error.toString());
    }
    return Promise.reject(error);
  }

  get(endpoint, body = {}) {
    return this.instance.get(endpoint, { params: body });
  }

  post(endpoint, body = {}) {
    return this.instance.post(endpoint, body);
  }

  put(endpoint, body = {}) {
    return this.instance.put(endpoint, body);
  }

  patch(endpoint, body = {}) {
    return this.instance.patch(endpoint, body);
  }

  delete(endpoint) {
    return this.instance.delete(endpoint);
  }
}

export default new AxiosServer();
