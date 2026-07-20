const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to delete operation", () => {
    const testObj = { keyToDelete: "value" };
    const key = "keyToDelete";

    // Create a mock object that tracks dispatch calls
    const dispatchCalls: any[] = [];
    const originalQ = Q;
    const mockQ = function(obj: any) {
      if (obj === testObj) {
        return {
          dispatch: (op: string, args: any[]) => {
            dispatchCalls.push({ op, args });
            return originalQ(obj).dispatch(op, args);
          }
        };
      }
      return originalQ(obj);
    };

    // Replace Q with our mock
    (global as any).Q = mockQ;

    try {
      // Call Q.delete synchronously
      Q.delete(testObj, key);

      // Verify the key was passed in the arguments
      expect(dispatchCalls.length).toBeGreaterThan(0);
      expect(dispatchCalls[0].op).toBe("delete");
      expect(dispatchCalls[0].args).toEqual([key]);
    } finally {
      // Restore original Q
      (global as any).Q = originalQ;
    }
  });
});