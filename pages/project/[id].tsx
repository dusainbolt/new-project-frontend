import { wrapper } from '@redux/store';
import { SSRContext } from '@type/context';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { END } from 'redux-saga';
import Helper from 'src/utils/helper';

const ProjectPage = () => {
  return (
    <Fragment>
      <Head>
        <title>"DYNAMIC ID"</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store): SSRContext | any =>
    async (context: GetServerSidePropsContext) => {
      await Helper.delay(1500);
      const id: any = context.query.id;
      console.log('id', id);
      // request here

      // dispatch data store here here

      // store.dispatch(getSuccess(data));
      // end the saga
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default ProjectPage;
