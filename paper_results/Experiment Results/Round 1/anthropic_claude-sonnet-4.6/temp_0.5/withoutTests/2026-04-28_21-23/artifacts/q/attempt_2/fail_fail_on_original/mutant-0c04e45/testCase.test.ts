import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey path", () => {
  it("should correctly invoke generator verb and use result in SpiderMonkey path", async () => {
    // Force the SpiderMonkey generators path by defining StopIteration globally
    (global as any).StopIteration = {};
    
    try {
      const asyncFn = Q.async(function () {
        // Simple generator-like object
        return {
          next: function () { return 42; },
          throw: function (e: any) { throw e; }
        };
      });
      
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});