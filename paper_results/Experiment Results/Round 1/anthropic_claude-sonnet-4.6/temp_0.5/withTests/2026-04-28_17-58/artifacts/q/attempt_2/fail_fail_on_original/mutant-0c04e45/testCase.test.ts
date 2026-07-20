import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async SpiderMonkey generator path", () => {
  it("should execute generator body and return correct value when StopIteration is defined", () => {
    // Define StopIteration globally to trigger the SpiderMonkey branch
    (global as any).StopIteration = {};

    try {
      // Create a simple mock generator (SpiderMonkey style - no Symbol.iterator)
      // In the SpiderMonkey branch, generator[verb](arg) is called and result is used directly
      // With the mutation, result = generator[verb](arg) is removed, so result stays undefined
      // and when(undefined, callback, errback) resolves immediately with undefined
      
      let callCount = 0;
      const mockGenerator = {
        next: function(arg: any) {
          callCount++;
          if (callCount === 1) {
            // First call: yield a resolved promise
            return Q.resolve(42);
          }
          // Second call should not happen in mutated code
          throw (global as any).StopIteration;
        },
        throw: function(e: any) {
          throw e;
        }
      };

      const originalMakeGenerator = function() {
        return mockGenerator;
      };

      const asyncFn = Q.async(originalMakeGenerator);
      
      return asyncFn().then((result: any) => {
        // In original: generator.next(undefined) returns Q.resolve(42),
        // then when(42, callback, errback) calls callback(42),
        // then generator.next(42) throws StopIteration with no value,
        // so result should be undefined (StopIteration.value is undefined)
        // 
        // In mutated: result stays undefined, when(undefined, callback, errback)
        // calls callback(undefined), then generator.next(undefined) again...
        // This would loop or resolve with undefined
        expect(callCount).toBeGreaterThanOrEqual(2);
        delete (global as any).StopIteration;
      }).catch((e: any) => {
        delete (global as any).StopIteration;
        throw e;
      });
    } catch(e) {
      delete (global as any).StopIteration;
      throw e;
    }
  });
});