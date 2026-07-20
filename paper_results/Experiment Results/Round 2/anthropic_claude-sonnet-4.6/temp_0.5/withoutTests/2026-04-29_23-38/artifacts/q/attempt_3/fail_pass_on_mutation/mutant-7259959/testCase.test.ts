import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("should resolve (not reject) with the return value when generator throws StopIteration with done=true", async () => {
    const originalStopIteration = (global as any).StopIteration;
    
    try {
      (global as any).StopIteration = {};
      
      const returnValue = 42;
      
      const stopIterException: any = {};
      stopIterException[Symbol.toStringTag] = "StopIteration";
      stopIterException.done = true;
      stopIterException.value = returnValue;
      
      const fakeGenerator = {
        next: function() {
          throw stopIterException;
        }
      };
      
      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });
      
      let resolved: any = undefined;
      let rejected: any = undefined;
      
      await asyncFn().then(
        (val: any) => { resolved = val; },
        (err: any) => { rejected = err; }
      );
      
      // Original: result.done is true -> resolves with 42
      // Mutated: if(false) -> rejects with the exception
      expect(rejected).toBeUndefined();
      expect(resolved).toBe(returnValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});