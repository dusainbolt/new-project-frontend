import HomePageComponent from '@components/index/HomePage';
import { useRedirectAuth } from '@hooks/useRedirectAuth';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector, wrapper } from '@redux/store';
import { SSGContext } from '@type/context';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const Home: FC<any> = () => {
  useRedirectAuth();
  const { token } = useAppSelector(getAuthSlice);
  return (
    <Fragment>
      <Head>
        <title>KYC Platform Home</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {!token && <HomePageComponent />}
    </Fragment>
  );
};

export const getStaticProps = wrapper.getStaticProps((): SSGContext | any => async () => {
  // await Helper.delay(5000);
});

export default Home;
