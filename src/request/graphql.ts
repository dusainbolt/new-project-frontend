import { ApolloClient, FetchPolicy, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RootState } from '@redux/reducer';
import { storeWrapper } from '@redux/store';
import Constant from '@utils/constant';
import { DocumentNode } from 'graphql';
import { toast } from 'react-toastify';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const error = graphQLErrors[0];
    if (error.message === 'Bad Request Exception') {
      //   console.log('graphQLErrors: ', graphQLErrors);
      toast.error((error.extensions as any).exception.response.message[0]);
    } else {
      //   console.log('ERROR');
    }
  }

  if (networkError) {
    // handle network error
    console.log('networkError: ', networkError);
  }
});

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    let token: any = '';
    if (typeof window !== 'undefined') {
      token = (storeWrapper.getState() as RootState)?.userSlice.token;
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const appLink = from([errorLink, httpLink]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(appLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};

const apolloInstance = new ApolloClient(createApolloClient());

type ApolloType = typeof apolloInstance;

class GraphQLReq {
  private readonly client: ApolloType = apolloInstance;

  private handleResponse =
    (callback = '') =>
    (res: any): any => {
      return callback ? res.data[callback] : res.data;
    };

  query = async (
    query: DocumentNode,
    variables: any = {},
    callback = '',
    fetchPolicy: FetchPolicy = Constant.graphQL.POLICY_NO_CACHE as any
  ): Promise<any> => {
    // if (fetchPolicy === FETCH_POLICY.NO_CACHE) {
    //   await this.client.resetStore();
    // }
    return await this.client.query({ query, variables, fetchPolicy }).then(this.handleResponse(callback));
  };

  mutation = async (mutation: DocumentNode, variables: any = {}, callback = '') => {
    return await this.client.mutate({ mutation, variables }).then(this.handleResponse(callback));
  };
}

export const graphQLReq = new GraphQLReq();
