import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should reject with a regular error, not resolve, when a non-QReturnValue error is thrown in SpiderMonkey path", async () => {
    // Force SpiderMonkey path by defining StopIteration globally
    (global as any).StopIteration = {};
    
    try {
      const error = new Error("regular error");
      const asyncFn = Q.async(function () {
        // old-style generator (not ES6)
        return {
          next: function() { throw error; }
        };
      });
      
      await expect(asyncFn()).rejects.toBe(error);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});