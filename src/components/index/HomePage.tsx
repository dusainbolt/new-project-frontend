import { Container } from '@mui/material';
import { FC } from 'react';
import { homePageStyles } from './homePageStyle';

const HomePageComponent: FC<any> = () => {
  const styles = homePageStyles();

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">HOME PAGE</Container>
    </main>
  );
};

export default HomePageComponent;
