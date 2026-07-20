const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Mock the dispatch method to verify arguments
    const mockDispatch = jest.fn();
    promise.dispatch = mockDispatch;

    // Perform delete operation
    promise.del("testKey");

    // Verify dispatch was called with correct arguments
    expect(mockDispatch).toHaveBeenCalledWith("delete", ["testKey"]);
  });
});