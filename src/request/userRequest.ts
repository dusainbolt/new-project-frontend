import { LoginParams } from '@redux/action/authAction';
import axios from './axios';

export const loginAPI = async (body: LoginParams) => {
  return await axios.post('/user/login', body);
};
