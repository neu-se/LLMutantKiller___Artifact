import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", async () => {
    const testObj = { keyToDelete: "value" };
    const key = "keyToDelete";

    // Create a mock promise that tracks dispatch calls
    const dispatchCalls: any[] = [];
    const mockPromise = {
      dispatch: (op: string, args: any[]) => {
        dispatchCalls.push({ op, args });
        return Promise.resolve({});
      }
    };

    // Mock Q to return our mock promise
    jest.spyOn(Q as any, 'default').mockReturnValue(mockPromise);

    // Call Q.delete
    await Q.delete(testObj, key);

    // Verify the key was passed in the arguments
    expect(dispatchCalls[0].op).toBe("delete");
    expect(dispatchCalls[0].args).toEqual([key]);
  });
});