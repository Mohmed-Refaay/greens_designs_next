import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Car = {
  __typename?: 'Car';
  color: Scalars['String'];
  coverImage: Scalars['String'];
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  model: Scalars['String'];
  name: Scalars['String'];
  topSpeed: Scalars['String'];
};

export type CarInput = {
  color: Scalars['String'];
  coverImage: Scalars['Upload'];
  model: Scalars['String'];
  name: Scalars['String'];
  topSpeed: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCar?: Maybe<Scalars['String']>;
  upload?: Maybe<Scalars['String']>;
};


export type MutationAddCarArgs = {
  input: CarInput;
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  getCars: Array<Car>;
  getUsers: Array<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  full_name: Scalars['String'];
  id: Scalars['ID'];
};

export type AddCarMutationVariables = Exact<{
  input: CarInput;
}>;


export type AddCarMutation = { __typename?: 'Mutation', addCar?: string | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, full_name: string, email: string }> };

export type UploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadMutation = { __typename?: 'Mutation', upload?: string | null };


export const AddCarDocument = gql`
    mutation addCar($input: carInput!) {
  addCar(input: $input)
}
    `;
export type AddCarMutationFn = Apollo.MutationFunction<AddCarMutation, AddCarMutationVariables>;

/**
 * __useAddCarMutation__
 *
 * To run a mutation, you first call `useAddCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCarMutation, { data, loading, error }] = useAddCarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCarMutation(baseOptions?: Apollo.MutationHookOptions<AddCarMutation, AddCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCarMutation, AddCarMutationVariables>(AddCarDocument, options);
      }
export type AddCarMutationHookResult = ReturnType<typeof useAddCarMutation>;
export type AddCarMutationResult = Apollo.MutationResult<AddCarMutation>;
export type AddCarMutationOptions = Apollo.BaseMutationOptions<AddCarMutation, AddCarMutationVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  getUsers {
    id
    full_name
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const UploadDocument = gql`
    mutation upload($file: Upload!) {
  upload(file: $file)
}
    `;
export type UploadMutationFn = Apollo.MutationFunction<UploadMutation, UploadMutationVariables>;

/**
 * __useUploadMutation__
 *
 * To run a mutation, you first call `useUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMutation, { data, loading, error }] = useUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMutation(baseOptions?: Apollo.MutationHookOptions<UploadMutation, UploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMutation, UploadMutationVariables>(UploadDocument, options);
      }
export type UploadMutationHookResult = ReturnType<typeof useUploadMutation>;
export type UploadMutationResult = Apollo.MutationResult<UploadMutation>;
export type UploadMutationOptions = Apollo.BaseMutationOptions<UploadMutation, UploadMutationVariables>;