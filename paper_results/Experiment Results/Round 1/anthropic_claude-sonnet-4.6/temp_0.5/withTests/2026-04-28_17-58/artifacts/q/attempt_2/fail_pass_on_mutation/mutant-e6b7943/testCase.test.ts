import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should reject when a regular error is thrown in async generator, not treat it as stop iteration", () => {
    // By defining StopIteration globally, we force the SpiderMonkey path in Q.async
    // In that path, isStopIteration is called on caught exceptions
    // Original: isStopIteration(regularError) = false -> rejects with error
    // Mutant: isStopIteration(regularError) = true -> fulfills with error.value (undefined)
    (global as any).StopIteration = {};
    
    const error = new Error("real error");
    const asyncFn = Q.async(function() {
      // This is a SpiderMonkey-style generator (no *)
      // We simulate it by returning an object with next() that throws
      return {
        next: function() { throw error; }
      };
    });
    
    delete (global as any).StopIteration;
    
    return asyncFn().then(
      () => { throw new Error("Should have rejected"); },
      (err: any) => { expect(err).toBe(error); }
    );
  });
});