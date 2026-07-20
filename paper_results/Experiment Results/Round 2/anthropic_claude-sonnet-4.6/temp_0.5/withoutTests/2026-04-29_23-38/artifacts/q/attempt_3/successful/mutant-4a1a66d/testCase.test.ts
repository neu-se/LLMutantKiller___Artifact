import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("handles QReturnValue thrown from SpiderMonkey-style generator when StopIteration is defined", async () => {
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = {}; // Make StopIteration defined
    
    try {
      // Q["return"] throws a QReturnValue, which isStopIteration recognizes
      // In SpiderMonkey path: caught as return value -> resolves with value
      // In ES6 path (mutated): thrown exception -> rejected promise
      const asyncFn = Q.async(function() {
        return {
          next: function() { Q["return"](42); },
          throw: function(e: any) { throw e; }
        };
      });
      
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});