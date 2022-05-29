import { Button } from '@common/Button';
import { Container, Typography } from '@mui/material';
import { getListUserStart, getUserSlice, logout } from '@redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { updateUserMutation } from '@request/graphql/mutation/update-user.mutation';
import { UpdateUserInput } from '@type/user';
import Validate from '@utils/validate';
import clsx from 'clsx';
import { Formik } from 'formik';
import { FC, useEffect } from 'react';
import { CardUser } from 'src/shared/Card/CardUser';
import * as yup from 'yup';
import { FormEditUser } from './FormEditUser';
import { homePageStyle } from './homePageStyle';

const HomePage: FC<any> = () => {
  const styles = homePageStyle();
  const { user, list } = useAppSelector(getUserSlice);

  const dispatch = useAppDispatch();

  const initValueFormEditUser: UpdateUserInput = { username: '' };

  const validateFormEditUser = yup.object({
    username: yup.string().required(Validate.require('username')),
    // .min(4, Validate.during(4, 12))
    // .max(12, Validate.during(4, 12)),
  });

  useEffect(() => {
    dispatch(getListUserStart());
  }, []);

  const logOut = () => {
    dispatch(logout());
  };

  const onSubmitEditUser = async (values) => {
    await updateUserMutation(values);
  };

  return (
    <main className={clsx(styles.main, styles.spacingContent)}>
      <Container maxWidth="lg">
        <CardUser user={user} />
        <Button onClick={logOut} variant="contained">
          Dang xuat
        </Button>
        <Formik
          onSubmit={onSubmitEditUser}
          validationSchema={validateFormEditUser}
          initialValues={initValueFormEditUser}
        >
          <FormEditUser />
        </Formik>
        <Typography variant="h4" color="text.secondary">
          Danh sach user
        </Typography>
        {list?.map((item, index) => (
          <CardUser index={index} user={item} />
        ))}
      </Container>
    </main>
  );
};

export default HomePage;
