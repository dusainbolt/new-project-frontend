import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { defaultStyle } from '@styles/theme';

export const homePageStyle = makeStyles((theme: Theme) => ({
  main: {
    background: theme.palette.common.white,
  },
  title: {
    fontSize: 58,
  },
  spacingContent: {
    marginTop: theme.spacing(4),
  },
  // spacingContentSmall: {
  //   marginTop: theme.spacing(2),
  // },
  btnMetamask: {
    ...defaultStyle.btnStyle('#dc6a00', '#dc6a001c'),
    '& .icon-metamask': {
      width: 32,
    },
  },
  btnWalletConnect: {
    borderColor: '#5dabfc',
    color: '#5dabfc',
  },

  // btnGroupToggle: {
  //   '& button': {
  //     marginRight: theme.spacing(1),
  //     border: 'none !important',
  //     borderRadius: `${theme.spacing(2)} !important`,
  //   },
  // },
}));
