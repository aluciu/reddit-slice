import reducer, { loadCommentsForPostId } from "./commentsSlice";

const initialState = {
  byPostId: {},
  loading: false,
  error: false,
};

test("has a default state", () => {
  const action = { type: "undefined" };

  expect(reducer(undefined, action)).toEqual(initialState);
});

test("sets loading state to 'true' when loadCommentsForPostId is pending", () => {
  const action = { type: loadCommentsForPostId.pending.type };
  const state = reducer(initialState, action);

  const expected = {
    ...initialState,
    loading: true,
  };

  expect(state).toEqual(expected);
});

test("populate byPostId object when loadCommentsForPostId is fulfilled", () => {
  const commentsMock = [
    {
      data: {
        children: [
          {
            data: {
              id: "postId"
            }
          }
        ]
      }
    },
    {
      data: {
        children: [
          {
            data: { id: "1" }
          },
          {
            data: { id: "2" }
          },
        ]
      }
    }
  ];

  const action = { type: loadCommentsForPostId.fulfilled.type, payload: commentsMock };
  const state = reducer(initialState, action);

  const expected = {
    ...initialState,
    byPostId: {
      "postId": [{ id: "1" }, { id: "2" }]
    },
  };

  expect(state).toEqual(expected);
});

test("sets error state to 'true' when loadCommentsForPostId is rejected", () => {
  const action = { type: loadCommentsForPostId.rejected.type };
  const state = reducer(initialState, action);

  const expected = {
    ...initialState,
    error: true,
  };

  expect(state).toEqual(expected);
});

test("selectComments is returning a comment", () => {
  const action = { type: loadCommentsForPostId.rejected.type };
  const state = reducer(initialState, action);

  const expected = {
    ...initialState,
    error: true,
  };

  expect(state).toEqual(expected);
});