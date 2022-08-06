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
};

export type Mutation = {
  __typename?: 'Mutation';
  addSection: Section;
  deleteSection: Scalars['Boolean'];
  updateSection: Section;
};


export type MutationAddSectionArgs = {
  coverImage: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateSectionArgs = {
  coverImage: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getSections: Array<Section>;
  getUsers: Array<User>;
};

export type Section = {
  __typename?: 'Section';
  coverImage: Scalars['String'];
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  full_name: Scalars['String'];
  id: Scalars['ID'];
};

export type SectionFragmentFragment = { __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string };

export type AddSectionMutationVariables = Exact<{
  coverImage: Scalars['String'];
  title: Scalars['String'];
}>;


export type AddSectionMutation = { __typename?: 'Mutation', addSection: { __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string } };

export type DeleteSectionMutationVariables = Exact<{
  deleteSectionId: Scalars['Int'];
}>;


export type DeleteSectionMutation = { __typename?: 'Mutation', deleteSection: boolean };

export type UpdateSectionMutationVariables = Exact<{
  coverImage: Scalars['String'];
  updateSectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdateSectionMutation = { __typename?: 'Mutation', updateSection: { __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string } };

export type GetSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionsQuery = { __typename?: 'Query', getSections: Array<{ __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string }> };

export const SectionFragmentFragmentDoc = gql`
    fragment SectionFragment on Section {
  id
  createAt
  title
  coverImage
}
    `;
export const AddSectionDocument = gql`
    mutation AddSection($coverImage: String!, $title: String!) {
  addSection(coverImage: $coverImage, title: $title) {
    ...SectionFragment
  }
}
    ${SectionFragmentFragmentDoc}`;
export type AddSectionMutationFn = Apollo.MutationFunction<AddSectionMutation, AddSectionMutationVariables>;

/**
 * __useAddSectionMutation__
 *
 * To run a mutation, you first call `useAddSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSectionMutation, { data, loading, error }] = useAddSectionMutation({
 *   variables: {
 *      coverImage: // value for 'coverImage'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddSectionMutation(baseOptions?: Apollo.MutationHookOptions<AddSectionMutation, AddSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSectionMutation, AddSectionMutationVariables>(AddSectionDocument, options);
      }
export type AddSectionMutationHookResult = ReturnType<typeof useAddSectionMutation>;
export type AddSectionMutationResult = Apollo.MutationResult<AddSectionMutation>;
export type AddSectionMutationOptions = Apollo.BaseMutationOptions<AddSectionMutation, AddSectionMutationVariables>;
export const DeleteSectionDocument = gql`
    mutation deleteSection($deleteSectionId: Int!) {
  deleteSection(id: $deleteSectionId)
}
    `;
export type DeleteSectionMutationFn = Apollo.MutationFunction<DeleteSectionMutation, DeleteSectionMutationVariables>;

/**
 * __useDeleteSectionMutation__
 *
 * To run a mutation, you first call `useDeleteSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectionMutation, { data, loading, error }] = useDeleteSectionMutation({
 *   variables: {
 *      deleteSectionId: // value for 'deleteSectionId'
 *   },
 * });
 */
export function useDeleteSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSectionMutation, DeleteSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSectionMutation, DeleteSectionMutationVariables>(DeleteSectionDocument, options);
      }
export type DeleteSectionMutationHookResult = ReturnType<typeof useDeleteSectionMutation>;
export type DeleteSectionMutationResult = Apollo.MutationResult<DeleteSectionMutation>;
export type DeleteSectionMutationOptions = Apollo.BaseMutationOptions<DeleteSectionMutation, DeleteSectionMutationVariables>;
export const UpdateSectionDocument = gql`
    mutation UpdateSection($coverImage: String!, $updateSectionId: String!, $title: String!) {
  updateSection(coverImage: $coverImage, id: $updateSectionId, title: $title) {
    ...SectionFragment
  }
}
    ${SectionFragmentFragmentDoc}`;
export type UpdateSectionMutationFn = Apollo.MutationFunction<UpdateSectionMutation, UpdateSectionMutationVariables>;

/**
 * __useUpdateSectionMutation__
 *
 * To run a mutation, you first call `useUpdateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionMutation, { data, loading, error }] = useUpdateSectionMutation({
 *   variables: {
 *      coverImage: // value for 'coverImage'
 *      updateSectionId: // value for 'updateSectionId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSectionMutation, UpdateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSectionMutation, UpdateSectionMutationVariables>(UpdateSectionDocument, options);
      }
export type UpdateSectionMutationHookResult = ReturnType<typeof useUpdateSectionMutation>;
export type UpdateSectionMutationResult = Apollo.MutationResult<UpdateSectionMutation>;
export type UpdateSectionMutationOptions = Apollo.BaseMutationOptions<UpdateSectionMutation, UpdateSectionMutationVariables>;
export const GetSectionsDocument = gql`
    query GetSections {
  getSections {
    ...SectionFragment
  }
}
    ${SectionFragmentFragmentDoc}`;

/**
 * __useGetSectionsQuery__
 *
 * To run a query within a React component, call `useGetSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, options);
      }
export function useGetSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, options);
        }
export type GetSectionsQueryHookResult = ReturnType<typeof useGetSectionsQuery>;
export type GetSectionsLazyQueryHookResult = ReturnType<typeof useGetSectionsLazyQuery>;
export type GetSectionsQueryResult = Apollo.QueryResult<GetSectionsQuery, GetSectionsQueryVariables>;