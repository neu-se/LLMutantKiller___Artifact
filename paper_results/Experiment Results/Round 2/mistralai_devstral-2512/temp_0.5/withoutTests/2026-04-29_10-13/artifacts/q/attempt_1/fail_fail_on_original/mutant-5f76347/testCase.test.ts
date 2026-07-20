import { Q } from "./q.js";

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", async () => {
    const obj = { test: "value" };
    const key = "test";

    // Create a mock object that tracks the arguments passed to dispatch
    const mockDispatch = jest.fn();
    const mockPromise = {
      dispatch: mockDispatch,
      then: (onFulfilled: any) => {
        onFulfilled({});
        return Promise.resolve({});
      }
    };

    // Mock Q to return our mock promise
    jest.spyOn(Q as any, 'default').mockImplementation(() => mockPromise);

    // Call Q.delete
    await Q.delete(obj, key);

    // Verify that the key was passed correctly
    expect(mockDispatch).toHaveBeenCalledWith("delete", [key]);
  });
});