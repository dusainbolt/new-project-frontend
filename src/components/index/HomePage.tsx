import { ButtonTheme } from '@common/Button/ButtonTheme';
import { Container } from '@mui/material';
import { FC } from 'react';
import { homePageStyles } from './homePageStyle';

const HomePageComponent: FC<any> = () => {
  const styles = homePageStyles();

  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        HOME PAGE
        <div>
          <ButtonTheme />
        </div>
      </Container>
    </main>
  );
};

export default HomePageComponent;
