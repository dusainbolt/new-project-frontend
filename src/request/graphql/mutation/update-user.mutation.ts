import { gql } from '@apollo/client';
import { graphQLReq } from '@request/graphql';
import { UpdateUserInput } from '@type/user';

const query = gql`
  mutation Mutation($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

export const updateUserMutation = async (variables: UpdateUserInput): Promise<any> => {
  return await graphQLReq.mutation(query, { input: variables }, 'updateUser');
};
