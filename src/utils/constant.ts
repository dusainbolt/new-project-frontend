const Constant = {
  FORM: { UNKNOWN_LABEL: 'Unknown label', TYPE_TEXT: 'text', TYPE_PASSWORD: 'password' },
  DATE: {
    D_M_Y: 'DD/MM/YYYY',
    D_M_Y_H_M: 'DD/MM/YYYY HH:mm',
  },
  CODE: {
    ALREADY_PENDING_REQUEST: -32002,
    ERROR_AUTHENTICATION: 401,
    ERROR_RESPONSE: 500,
    SUCCESS_RESPONSE: 200,
  },
  THEME_MODE: {
    KEY: 'theme_mode',
    DARK: 'dark' as any,
    LIGHT: 'light' as any,
  },
};

export default Constant;
