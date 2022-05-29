import { gql } from '@apollo/client';
import { graphQLReq } from '@request/graphql';
import { SearchUserInput } from '@type/user';

const query = gql`
  query SearchUser($input: SearchUserInput!) {
    searchUser(input: $input) {
      _id
      avatar
      birthday
      createdAt
      email
      firstName
      gender
      lastName
      name
      roles
      phone
      socialId
      socialType
      status
      updatedAt
      username
    }
  }
`;

export const searchUserQuery = async (variables: SearchUserInput = {}): Promise<any> => {
  return await graphQLReq.query(query, { input: variables }, 'searchUser');
};
