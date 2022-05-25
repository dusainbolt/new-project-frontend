/* eslint-disable @typescript-eslint/no-empty-function */
import { CacheProvider, EmotionCache } from '@emotion/react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import NoSsr from '@mui/material/NoSsr';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { wrapper } from '@redux/store';
import { compose } from '@reduxjs/toolkit';
import axios from '@request/axios';
import '@styles/globals.css';
import { createEmotionCache, getThemeConfig } from '@styles/theme';
import { AuthSlice } from '@type/auth';
import Constant from '@utils/constant';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { createContext, FC, useEffect, useMemo, useState } from 'react';
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

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const ThemeContext = createContext(Constant.THEME_MODE.LIGHT);

const MyApp: FC<MyAppProps> = (props: MyAppProps) => {
  const isClient = typeof window !== 'undefined';

  const store = useStore();

  const themeMode: any = isClient ? localStorage.getItem(Constant.THEME_MODE.KEY) : Constant.THEME_MODE.LIGHT;

  // theme logic
  const [mode, setMode] = useState<PaletteMode>(themeMode);

  useEffect(() => {
    mode && localStorage.setItem(Constant.THEME_MODE.KEY, mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // store.dispatch(toggleThemeMode());

        setMode((prevMode) =>
          prevMode === Constant.THEME_MODE.LIGHT ? Constant.THEME_MODE.DARK : Constant.THEME_MODE.LIGHT
        );
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getThemeConfig(mode)), [mode]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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
      <ThemeContext.Provider value={mode}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {PageComponent}
            <NoSsr>
              <NotificationContainer />
            </NoSsr>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
};

export default compose(wrapper.withRedux)(MyApp);
