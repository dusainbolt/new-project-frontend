import { VerifyOAuth2Params } from '@redux/actions/userAction';
import axios from '../axios';

export const verifyFacebookAPI = async (params: VerifyOAuth2Params) => {
  return await axios.get('/auth/facebook', params);
};

export const verifyGoogleAPI = async (params: VerifyOAuth2Params) => {
  return await axios.get(`/auth/google/${params.access_token}`);
};
