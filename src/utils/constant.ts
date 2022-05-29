import { SocialType } from '@type/user';

const Constant = {
  form: { UNKNOWN_LABEL: 'Unknown label', TYPE_TEXT: 'text', TYPE_PASSWORD: 'password' },
  date: {
    D_M_Y: 'DD/MM/YYYY',
    D_M_Y_H_M: 'DD/MM/YYYY HH:mm',
  },
  code: {
    ALREADY_PENDING_REQUEST: -32002,
    ERROR_AUTHENTICATION: 401,
    ERROR_RESPONSE: 500,
    SUCCESS_RESPONSE: 200,
  },
  theme: {
    KEY: 'theme_mode',
    DARK: 'dark' as any,
    LIGHT: 'light' as any,
  },
  social: {
    PROVIDE_FACEBOOK: 'facebook',
    PROVIDE_GOOGLE: 'google',
    TYPE: {
      facebook: SocialType.FACEBOOK,
      google: SocialType.GOOGLE,
    },
    TOKEN: {
      facebook: 'accessToken',
      google: 'idToken',
    },
  },
  graphQL: {
    POLICY_DEFAULT_CACHE: 'cache-first',
    POLICY_NO_CACHE: 'no-cache',
  },
};

export default Constant;
