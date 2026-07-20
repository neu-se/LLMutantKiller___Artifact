import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with QReturnValue (isStopIteration)", () => {
  it("should resolve with the value from Q.return() when used in SpiderMonkey-style generators", async () => {
    // Simulate SpiderMonkey environment by setting global StopIteration
    const globalAny = global as any;
    const originalStopIteration = globalAny.StopIteration;
    
    // Set StopIteration to trigger the SpiderMonkey code path in Q.async
    globalAny.StopIteration = {};

    try {
      // Create a fake SpiderMonkey-style generator that throws QReturnValue
      // (which is what Q["return"] does)
      const returnValue = 42;
      
      const asyncFn = Q.async(function() {
        // This is a fake generator object that simulates SpiderMonkey behavior
        // The generator's next() call throws a QReturnValue (via Q["return"])
        return {
          next: function() {
            Q["return"](returnValue);
          },
          send: function() {
            Q["return"](returnValue);
          }
        };
      });

      const result = await asyncFn();
      // In original code: isStopIteration(QReturnValue instance) returns true (via || branch)
      // so it returns Q(exception.value) = Q(42) = 42
      // In mutated code: isStopIteration returns false (since toString != "[object StopIteration]")
      // so it returns reject(exception) instead
      expect(result).toBe(returnValue);
    } finally {
      // Restore original StopIteration
      if (originalStopIteration === undefined) {
        delete globalAny.StopIteration;
      } else {
        globalAny.StopIteration = originalStopIteration;
      }
    }
  });
});