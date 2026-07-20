import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("should resolve with the return value when generator is done via StopIteration", async () => {
    const originalStopIteration = (global as any).StopIteration;
    
    try {
      // Set up StopIteration to activate the SpiderMonkey code path
      (global as any).StopIteration = {};
      
      const returnValue = 99;
      
      // Create a fake generator that throws a StopIteration-like exception
      // The exception must pass isStopIteration() check AND have done=true
      // isStopIteration checks: object_toString(exception) === "[object StopIteration]"
      // We can achieve this by making the exception's toString return "[object StopIteration]"
      const stopIterException: any = Object.create({
        toString: function() { return "[object StopIteration]"; }
      });
      stopIterException.done = true;
      stopIterException.value = returnValue;
      // Override Symbol.toStringTag to make Object.prototype.toString return the right value
      stopIterException[Symbol.toStringTag] = "StopIteration";
      
      const fakeGenerator = {
        next: function() {
          throw stopIterException;
        }
      };
      
      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });
      
      const result = await asyncFn();
      
      // Original: result.done is true -> returns Q(exception.value) = Q(99) -> resolves to 99
      // Mutated: if(false) -> falls to reject(exception) -> rejects
      expect(result).toBe(returnValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});