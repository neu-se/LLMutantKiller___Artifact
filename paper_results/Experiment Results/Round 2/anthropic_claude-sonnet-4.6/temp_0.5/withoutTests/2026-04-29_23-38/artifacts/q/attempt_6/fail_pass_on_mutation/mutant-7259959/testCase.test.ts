import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("resolves with return value when generator done=true and StopIteration thrown", async () => {
    const originalStopIteration = (global as any).StopIteration;

    try {
      (global as any).StopIteration = {};

      let callCount = 0;
      const returnValue = 777;

      const fakeGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            // Return a plain non-promise value with done=true
            // when() will fulfill with this object, then call callback again
            return { done: true, value: 1 };
          }
          // Second call: throw using Q["return"] which throws QReturnValue
          // QReturnValue passes isStopIteration check
          Q["return"](returnValue);
        }
      };

      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });

      const results: { resolved?: any; rejected?: any } = {};

      await new Promise<void>((resolve) => {
        asyncFn().then(
          (val: any) => { results.resolved = val; resolve(); },
          (err: any) => { results.rejected = err; resolve(); }
        );
      });

      // Original: result = {done:true}, result.done is true -> Q(exception.value) -> resolves to returnValue
      // Mutated: if(false) -> reject(exception) -> rejects
      expect(results.rejected).toBeUndefined();
      expect(results.resolved).toBe(returnValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});