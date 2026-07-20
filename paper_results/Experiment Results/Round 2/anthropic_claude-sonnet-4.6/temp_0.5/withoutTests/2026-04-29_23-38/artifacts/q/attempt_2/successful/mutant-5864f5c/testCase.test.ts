import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey path isStopIteration", () => {
  it("should reject when a non-StopIteration error is thrown in a generator", async () => {
    // Define StopIteration globally to trigger the SpiderMonkey path in Q.async
    (global as any).StopIteration = {};
    
    try {
      const error = new Error("real error");
      const asyncFn = Q.async(function () {
        // Simulate a generator-like object
        return {
          next: function () {
            throw error;
          }
        };
      });
      
      await expect(asyncFn()).rejects.toThrow("real error");
    } finally {
      delete (global as any).StopIteration;
    }
  });
});