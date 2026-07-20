import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator", () => {
  it("resolves with final value when generator signals done via result.done", async () => {
    (global as any).StopIteration = {};
    try {
      // Create a mock SpiderMonkey-style generator
      let callCount = 0;
      const mockGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            // First call: return a fulfilled promise result with done=true
            return { done: true, value: 42 };
          }
          throw new Error("StopIteration");
        },
        throw: function(e: any) { throw e; }
      };
      
      const originalMakeGenerator = function() { return mockGenerator; };
      const asyncFn = Q.async(originalMakeGenerator);
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});