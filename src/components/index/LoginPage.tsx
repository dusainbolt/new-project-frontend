// import FacebookLogin from 'react-facebook-login';
import { Button } from '@common/Button';
import { ButtonTheme } from '@common/Button/ButtonTheme';
import { Container, NoSsr } from '@mui/material';
import { getUserSlice, verifyOAuth2Start } from '@redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Constant from '@utils/constant';
import { FC } from 'react';
import SocialLogin, { Provider } from 'react-social-login';
import { toast } from 'react-toastify';
import { loginPageStyle } from './loginPageStyle';

const SocialButton = SocialLogin(Button);

const LoginPage: FC<any> = () => {
  const styles = loginPageStyle();
  const dispatch = useAppDispatch();
  const { loadingLogin } = useAppSelector(getUserSlice);

  const handleSocialLogin = (userSocial) => {
    const propNameToken = Constant.social.TOKEN[userSocial.provider] || '';
    dispatch(
      verifyOAuth2Start({
        access_token: userSocial?.token[propNameToken] as string,
        type: Constant.social.TYPE[userSocial.provider],
      })
    );
  };

  const handleSocialLoginFailure = (err) => {
    toast.error(err?.toString());
  };

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        Dang Nhap
        <div>
          <ButtonTheme />

          {/* <FacebookLogin
            appId="337403978525891"
            autoLoad
            textButton="Đăng nhập với Facebook"
            icon="fa-facebook"
            fields="name,email,picture"
            callback={responseFacebook}
          /> */}
          <img
            src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1363630274121334&height=50&width=50&ext=1656118945&hash=AeTC80A3q6WFtQhD8hQ"
            alt=""
          />
        </div>
      </Container>
      <NoSsr>
        <SocialButton
          provider={Constant.social.PROVIDE_FACEBOOK as Provider}
          appId="337403978525891"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          loading={loadingLogin}
        >
          Dang nhap voi Facebook
        </SocialButton>

        <SocialButton
          provider={Constant.social.PROVIDE_GOOGLE as Provider}
          appId="753875100965-uqa692t84g20k2m0djocqohr2c4d7a1u.apps.googleusercontent.com"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          loading={loadingLogin}
        >
          Dang nhap voi Google
        </SocialButton>
      </NoSsr>
    </main>
  );
};

export default LoginPage;
