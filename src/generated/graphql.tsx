import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  keyboards: Array<Keyboard>;
  userKeyboards: Array<Keyboard>;
  keyboard?: Maybe<Keyboard>;
  part?: Maybe<Part>;
  users?: Maybe<Array<User>>;
  user?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryUserKeyboardsArgs = {
  userId: Scalars['String'];
};


export type QueryKeyboardArgs = {
  id: Scalars['String'];
};


export type QueryPartArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Keyboard = {
  __typename?: 'Keyboard';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  parts?: Maybe<Array<Part>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  keyboards?: Maybe<Array<Keyboard>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Part = {
  __typename?: 'Part';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  keyboardId: Scalars['String'];
  keyboard: Keyboard;
};

export type Mutation = {
  __typename?: 'Mutation';
  createKeyboard: KeyboardResponse;
  updateKeyboard: KeyboardResponse;
  deleteKeyboard: Scalars['Boolean'];
  createPart: PartResponse;
  updatePart: PartResponse;
  deletePart: Scalars['Boolean'];
  updateUser: UserResponse;
  deleteUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationCreateKeyboardArgs = {
  input: NewKeyboardInput;
};


export type MutationUpdateKeyboardArgs = {
  input: UpdateKeyboardInput;
  id: Scalars['String'];
};


export type MutationDeleteKeyboardArgs = {
  id: Scalars['String'];
};


export type MutationCreatePartArgs = {
  input: NewPartInput;
  keyboardId: Scalars['String'];
};


export type MutationUpdatePartArgs = {
  input: UpdatePartInput;
  id: Scalars['String'];
};


export type MutationDeletePartArgs = {
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type KeyboardResponse = {
  __typename?: 'KeyboardResponse';
  errors?: Maybe<Array<FieldError>>;
  keyboard?: Maybe<Keyboard>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type NewKeyboardInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type UpdateKeyboardInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type PartResponse = {
  __typename?: 'PartResponse';
  errors?: Maybe<Array<FieldError>>;
  part?: Maybe<Part>;
};

export type NewPartInput = {
  title: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};

export type UpdatePartInput = {
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newPart: PartResponse;
};


export type SubscriptionNewPartArgs = {
  keyboardId: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularKeyboardFragment = (
  { __typename?: 'Keyboard' }
  & Pick<Keyboard, 'id' | 'title' | 'description' | 'image' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), parts?: Maybe<Array<(
    { __typename?: 'Part' }
    & RegularPartFragment
  )>> }
);

export type RegularKeyboardResponseFragment = (
  { __typename?: 'KeyboardResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, keyboard?: Maybe<(
    { __typename?: 'Keyboard' }
    & RegularKeyboardFragment
  )> }
);

export type RegularPartFragment = (
  { __typename?: 'Part' }
  & Pick<Part, 'id' | 'title' | 'url' | 'price' | 'createdAt' | 'updatedAt'>
);

export type RegularPartResponseFragment = (
  { __typename?: 'PartResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, part?: Maybe<(
    { __typename?: 'Part' }
    & RegularPartFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type SimpleKeyboardFragment = (
  { __typename?: 'Keyboard' }
  & Pick<Keyboard, 'id' | 'title' | 'description' | 'image' | 'createdAt' | 'updatedAt'>
);

export type SimpleKeyboardResponseFragment = (
  { __typename?: 'KeyboardResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, keyboard?: Maybe<(
    { __typename?: 'Keyboard' }
    & SimpleKeyboardFragment
  )> }
);

export type CreateKeyboardMutationVariables = Exact<{
  input: NewKeyboardInput;
}>;


export type CreateKeyboardMutation = (
  { __typename?: 'Mutation' }
  & { createKeyboard: (
    { __typename?: 'KeyboardResponse' }
    & SimpleKeyboardResponseFragment
  ) }
);

export type CreatePartMutationVariables = Exact<{
  keyboardId: Scalars['String'];
  input: NewPartInput;
}>;


export type CreatePartMutation = (
  { __typename?: 'Mutation' }
  & { createPart: (
    { __typename?: 'PartResponse' }
    & RegularPartResponseFragment
  ) }
);

export type DeleteKeybardMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteKeybardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteKeyboard'>
);

export type DeletePartMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePart'>
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateKeyboardMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateKeyboardInput;
}>;


export type UpdateKeyboardMutation = (
  { __typename?: 'Mutation' }
  & { updateKeyboard: (
    { __typename?: 'KeyboardResponse' }
    & SimpleKeyboardResponseFragment
  ) }
);

export type UpdatePartMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdatePartInput;
}>;


export type UpdatePartMutation = (
  { __typename?: 'Mutation' }
  & { updatePart: (
    { __typename?: 'PartResponse' }
    & RegularPartResponseFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type KeyboardQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type KeyboardQuery = (
  { __typename?: 'Query' }
  & { keyboard?: Maybe<(
    { __typename?: 'Keyboard' }
    & RegularKeyboardFragment
  )> }
);

export type KeyboardsQueryVariables = Exact<{ [key: string]: never; }>;


export type KeyboardsQuery = (
  { __typename?: 'Query' }
  & { keyboards: Array<(
    { __typename?: 'Keyboard' }
    & RegularKeyboardFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type NewPartSubscriptionVariables = Exact<{
  keyboardId: Scalars['String'];
}>;


export type NewPartSubscription = (
  { __typename?: 'Subscription' }
  & { newPart: (
    { __typename?: 'PartResponse' }
    & RegularPartResponseFragment
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularPartFragmentDoc = gql`
    fragment RegularPart on Part {
  id
  title
  url
  price
  createdAt
  updatedAt
}
    `;
export const RegularKeyboardFragmentDoc = gql`
    fragment RegularKeyboard on Keyboard {
  id
  title
  description
  image
  createdAt
  updatedAt
  user {
    ...RegularUser
  }
  parts {
    ...RegularPart
  }
}
    ${RegularUserFragmentDoc}
${RegularPartFragmentDoc}`;
export const RegularKeyboardResponseFragmentDoc = gql`
    fragment RegularKeyboardResponse on KeyboardResponse {
  errors {
    ...RegularError
  }
  keyboard {
    ...RegularKeyboard
  }
}
    ${RegularErrorFragmentDoc}
${RegularKeyboardFragmentDoc}`;
export const RegularPartResponseFragmentDoc = gql`
    fragment RegularPartResponse on PartResponse {
  errors {
    ...RegularError
  }
  part {
    ...RegularPart
  }
}
    ${RegularErrorFragmentDoc}
${RegularPartFragmentDoc}`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const SimpleKeyboardFragmentDoc = gql`
    fragment SimpleKeyboard on Keyboard {
  id
  title
  description
  image
  createdAt
  updatedAt
}
    `;
export const SimpleKeyboardResponseFragmentDoc = gql`
    fragment SimpleKeyboardResponse on KeyboardResponse {
  errors {
    ...RegularError
  }
  keyboard {
    ...SimpleKeyboard
  }
}
    ${RegularErrorFragmentDoc}
${SimpleKeyboardFragmentDoc}`;
export const CreateKeyboardDocument = gql`
    mutation CreateKeyboard($input: NewKeyboardInput!) {
  createKeyboard(input: $input) {
    ...SimpleKeyboardResponse
  }
}
    ${SimpleKeyboardResponseFragmentDoc}`;

export function useCreateKeyboardMutation() {
  return Urql.useMutation<CreateKeyboardMutation, CreateKeyboardMutationVariables>(CreateKeyboardDocument);
};
export const CreatePartDocument = gql`
    mutation CreatePart($keyboardId: String!, $input: NewPartInput!) {
  createPart(keyboardId: $keyboardId, input: $input) {
    ...RegularPartResponse
  }
}
    ${RegularPartResponseFragmentDoc}`;

export function useCreatePartMutation() {
  return Urql.useMutation<CreatePartMutation, CreatePartMutationVariables>(CreatePartDocument);
};
export const DeleteKeybardDocument = gql`
    mutation DeleteKeybard($id: String!) {
  deleteKeyboard(id: $id)
}
    `;

export function useDeleteKeybardMutation() {
  return Urql.useMutation<DeleteKeybardMutation, DeleteKeybardMutationVariables>(DeleteKeybardDocument);
};
export const DeletePartDocument = gql`
    mutation DeletePart($id: String!) {
  deletePart(id: $id)
}
    `;

export function useDeletePartMutation() {
  return Urql.useMutation<DeletePartMutation, DeletePartMutationVariables>(DeletePartDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UpdateKeyboardDocument = gql`
    mutation UpdateKeyboard($id: String!, $input: UpdateKeyboardInput!) {
  updateKeyboard(id: $id, input: $input) {
    ...SimpleKeyboardResponse
  }
}
    ${SimpleKeyboardResponseFragmentDoc}`;

export function useUpdateKeyboardMutation() {
  return Urql.useMutation<UpdateKeyboardMutation, UpdateKeyboardMutationVariables>(UpdateKeyboardDocument);
};
export const UpdatePartDocument = gql`
    mutation UpdatePart($id: String!, $input: UpdatePartInput!) {
  updatePart(id: $id, input: $input) {
    ...RegularPartResponse
  }
}
    ${RegularPartResponseFragmentDoc}`;

export function useUpdatePartMutation() {
  return Urql.useMutation<UpdatePartMutation, UpdatePartMutationVariables>(UpdatePartDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const KeyboardDocument = gql`
    query Keyboard($id: String!) {
  keyboard(id: $id) {
    ...RegularKeyboard
  }
}
    ${RegularKeyboardFragmentDoc}`;

export function useKeyboardQuery(options: Omit<Urql.UseQueryArgs<KeyboardQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<KeyboardQuery>({ query: KeyboardDocument, ...options });
};
export const KeyboardsDocument = gql`
    query Keyboards {
  keyboards {
    ...RegularKeyboard
  }
}
    ${RegularKeyboardFragmentDoc}`;

export function useKeyboardsQuery(options: Omit<Urql.UseQueryArgs<KeyboardsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<KeyboardsQuery>({ query: KeyboardsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const NewPartDocument = gql`
    subscription NewPart($keyboardId: String!) {
  newPart(keyboardId: $keyboardId) {
    ...RegularPartResponse
  }
}
    ${RegularPartResponseFragmentDoc}`;

export function useNewPartSubscription<TData = NewPartSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewPartSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewPartSubscription, TData>) {
  return Urql.useSubscription<NewPartSubscription, TData, NewPartSubscriptionVariables>({ query: NewPartDocument, ...options }, handler);
};