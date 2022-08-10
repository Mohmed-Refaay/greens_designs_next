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

export type Image = {
  __typename?: 'Image';
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  projectId: Scalars['Float'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProject: Project;
  addProjectImage: Scalars['Boolean'];
  addSection: Section;
  deleteProject: Scalars['Boolean'];
  deleteProjectImage: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  updateProject: Project;
  updateSection: Section;
};


export type MutationAddProjectArgs = {
  content: Scalars['String'];
  sectionId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationAddProjectImageArgs = {
  projectId: Scalars['Float'];
  url: Scalars['String'];
};


export type MutationAddSectionArgs = {
  coverImage: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectImageArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProjectArgs = {
  content: Scalars['String'];
  id: Scalars['Float'];
  sectionId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationUpdateSectionArgs = {
  coverImage: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  content: Scalars['String'];
  coverImage?: Maybe<Image>;
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  images: Array<Image>;
  section: Section;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getProjects: Array<Project>;
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

export type AddProjectMutationVariables = Exact<{
  sectionId: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type AddProjectMutation = { __typename?: 'Mutation', addProject: { __typename?: 'Project', id: string, createAt: any, title: string, content: string, images: Array<{ __typename?: 'Image', url: string, id: string }> } };

export type AddProjectImageMutationVariables = Exact<{
  projectId: Scalars['Float'];
  url: Scalars['String'];
}>;


export type AddProjectImageMutation = { __typename?: 'Mutation', addProjectImage: boolean };

export type AddSectionMutationVariables = Exact<{
  coverImage: Scalars['String'];
  title: Scalars['String'];
}>;


export type AddSectionMutation = { __typename?: 'Mutation', addSection: { __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string } };

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars['Int'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type DeleteProjectImageMutationVariables = Exact<{
  deleteProjectImageId: Scalars['Float'];
}>;


export type DeleteProjectImageMutation = { __typename?: 'Mutation', deleteProjectImage: boolean };

export type DeleteSectionMutationVariables = Exact<{
  deleteSectionId: Scalars['Int'];
}>;


export type DeleteSectionMutation = { __typename?: 'Mutation', deleteSection: boolean };

export type UpdateProjectMutationVariables = Exact<{
  sectionId: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
  updateProjectId: Scalars['Float'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string } };

export type UpdateSectionMutationVariables = Exact<{
  coverImage: Scalars['String'];
  updateSectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdateSectionMutation = { __typename?: 'Mutation', updateSection: { __typename?: 'Section', id: string, createAt: any, title: string, coverImage: string } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects: Array<{ __typename?: 'Project', id: string, createAt: any, title: string, content: string, section: { __typename?: 'Section', id: string, title: string }, coverImage?: { __typename?: 'Image', id: string, url: string } | null, images: Array<{ __typename?: 'Image', id: string, url: string }> }> };

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
export const AddProjectDocument = gql`
    mutation AddProject($sectionId: Float!, $title: String!, $content: String!) {
  addProject(sectionId: $sectionId, title: $title, content: $content) {
    id
    createAt
    title
    content
    images {
      url
      id
    }
  }
}
    `;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, options);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const AddProjectImageDocument = gql`
    mutation AddProjectImage($projectId: Float!, $url: String!) {
  addProjectImage(projectId: $projectId, url: $url)
}
    `;
export type AddProjectImageMutationFn = Apollo.MutationFunction<AddProjectImageMutation, AddProjectImageMutationVariables>;

/**
 * __useAddProjectImageMutation__
 *
 * To run a mutation, you first call `useAddProjectImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectImageMutation, { data, loading, error }] = useAddProjectImageMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAddProjectImageMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectImageMutation, AddProjectImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectImageMutation, AddProjectImageMutationVariables>(AddProjectImageDocument, options);
      }
export type AddProjectImageMutationHookResult = ReturnType<typeof useAddProjectImageMutation>;
export type AddProjectImageMutationResult = Apollo.MutationResult<AddProjectImageMutation>;
export type AddProjectImageMutationOptions = Apollo.BaseMutationOptions<AddProjectImageMutation, AddProjectImageMutationVariables>;
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
export const DeleteProjectDocument = gql`
    mutation DeleteProject($deleteProjectId: Int!) {
  deleteProject(id: $deleteProjectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      deleteProjectId: // value for 'deleteProjectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteProjectImageDocument = gql`
    mutation DeleteProjectImage($deleteProjectImageId: Float!) {
  deleteProjectImage(id: $deleteProjectImageId)
}
    `;
export type DeleteProjectImageMutationFn = Apollo.MutationFunction<DeleteProjectImageMutation, DeleteProjectImageMutationVariables>;

/**
 * __useDeleteProjectImageMutation__
 *
 * To run a mutation, you first call `useDeleteProjectImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectImageMutation, { data, loading, error }] = useDeleteProjectImageMutation({
 *   variables: {
 *      deleteProjectImageId: // value for 'deleteProjectImageId'
 *   },
 * });
 */
export function useDeleteProjectImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectImageMutation, DeleteProjectImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectImageMutation, DeleteProjectImageMutationVariables>(DeleteProjectImageDocument, options);
      }
export type DeleteProjectImageMutationHookResult = ReturnType<typeof useDeleteProjectImageMutation>;
export type DeleteProjectImageMutationResult = Apollo.MutationResult<DeleteProjectImageMutation>;
export type DeleteProjectImageMutationOptions = Apollo.BaseMutationOptions<DeleteProjectImageMutation, DeleteProjectImageMutationVariables>;
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
export const UpdateProjectDocument = gql`
    mutation UpdateProject($sectionId: Float!, $title: String!, $content: String!, $updateProjectId: Float!) {
  updateProject(sectionId: $sectionId, title: $title, content: $content, id: $updateProjectId) {
    id
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      updateProjectId: // value for 'updateProjectId'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
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
export const GetProjectsDocument = gql`
    query GetProjects {
  getProjects {
    id
    createAt
    title
    content
    section {
      id
      title
    }
    coverImage {
      id
      url
    }
    images {
      id
      url
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
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