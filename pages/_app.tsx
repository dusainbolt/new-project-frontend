import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import NoSsr from '@mui/material/NoSsr';
import { ThemeProvider } from '@mui/material/styles';
import { wrapper } from '@redux/store';
import { compose } from '@reduxjs/toolkit';
import axios from '@request/axios';
import '@styles/globals.css';
import theme, { createEmotionCache } from '@styles/theme';
import { AuthSlice } from '@type/auth';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
//@ts-ignore
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useStore } from 'react-redux';
import { Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const onBeforeLift = (store: Store) => () => {
  const authSlice: AuthSlice = store.getState().authSlice;
  axios.setTokenRequest(authSlice.token as any);
};

const MyApp: FC<MyAppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore();
  const isClient = typeof window !== 'undefined';

  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles?.parentElement?.removeChild(jssStyles);
  //   }
  // }, []);

  const PageComponent = isClient ? (
    <PersistGate persistor={(store as any).__persistor} onBeforeLift={onBeforeLift(store)} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {PageComponent}
        <NoSsr>
          <NotificationContainer />
        </NoSsr>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default compose(wrapper.withRedux)(MyApp);
