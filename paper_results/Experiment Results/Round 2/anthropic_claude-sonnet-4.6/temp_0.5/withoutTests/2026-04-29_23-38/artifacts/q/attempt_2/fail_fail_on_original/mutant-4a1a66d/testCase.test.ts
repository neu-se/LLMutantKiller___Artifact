import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async mutation detection", () => {
  it("should handle StopIteration as a return value in SpiderMonkey mode", async () => {
    const originalStopIteration = (global as any).StopIteration;
    
    class MockStopIteration extends Error {
      value: any;
      constructor(value?: any) {
        super();
        this.value = value;
      }
    }
    (global as any).StopIteration = MockStopIteration;
    
    try {
      const asyncFn = Q.async(function* () {
        // This generator will complete normally
        return 42;
      });
      
      // Original: StopIteration defined -> SpiderMonkey path -> catches StopIteration exception as return
      // Mutated: if(true) -> ES6 path -> uses result.done
      // Both should work for ES6 generators... need different approach
      
      // Make a fake SpiderMonkey-style generator that throws StopIteration
      const asyncFn2 = Q.async(function() {
        return {
          next: function() { throw new MockStopIteration(99); },
          throw: function(e: any) { throw e; }
        };
      });
      
      // Original code: StopIteration is defined, so uses SpiderMonkey path
      // SpiderMonkey path: catches StopIteration -> returns Q(exception.value) = Q(99)
      // Mutated code: if(true) -> ES6 path: result = generator.next() throws -> reject(exception)
      // So original resolves with 99, mutated rejects
      const result = await asyncFn2();
      expect(result).toBe(99);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});