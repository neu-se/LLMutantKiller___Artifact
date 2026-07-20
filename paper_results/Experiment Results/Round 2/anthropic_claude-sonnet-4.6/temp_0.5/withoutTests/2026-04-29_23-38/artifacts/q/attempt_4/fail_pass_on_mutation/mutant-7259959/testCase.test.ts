import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("should resolve with return value when StopIteration is thrown after a yield", async () => {
    const originalStopIteration = (global as any).StopIteration;
    
    try {
      (global as any).StopIteration = {};
      
      const returnValue = 42;
      let callCount = 0;
      
      const stopIterException: any = {};
      stopIterException[Symbol.toStringTag] = "StopIteration";
      stopIterException.done = true;
      stopIterException.value = returnValue;
      
      // First call: return a resolved value (simulating a yield of a resolved promise)
      // Second call: throw StopIteration with done=true
      const fakeGenerator = {
        next: function(val: any) {
          callCount++;
          if (callCount === 1) {
            // Return a non-thenable so when() resolves immediately and calls callback again
            return Q(1); // a resolved promise - result will be set to this
          } else {
            throw stopIterException;
          }
        }
      };
      
      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });
      
      let resolved: any = "NOT_SET";
      let rejected: any = "NOT_SET";
      
      await asyncFn().then(
        (val: any) => { resolved = val; },
        (err: any) => { rejected = err; }
      );
      
      // Original: result.done is true -> resolves with 42
      // Mutated: if(false) -> rejects with the exception
      expect(rejected).toBe("NOT_SET");
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