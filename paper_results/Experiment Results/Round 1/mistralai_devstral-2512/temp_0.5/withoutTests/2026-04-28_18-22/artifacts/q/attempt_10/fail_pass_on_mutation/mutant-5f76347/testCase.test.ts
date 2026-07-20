const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Mock dispatch to verify exact call
    const mockDispatch = jest.fn((op: string, args: any[]) => {
      return { then: (cb: Function) => cb() };
    });
    promise.dispatch = mockDispatch;

    // Perform delete operation
    promise.del("testKey");

    // Verify dispatch was called with exactly ["testKey"]
    expect(mockDispatch).toHaveBeenCalledWith("delete", ["testKey"]);
    expect(mockDispatch.mock.calls[0][1]).toEqual(["testKey"]);
    expect(mockDispatch.mock.calls[0][1].length).toBe(1);
  });
});