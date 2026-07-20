import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("should return the value when a StopIteration exception has result.done truthy", async () => {
    // Simulate SpiderMonkey's StopIteration environment
    const originalStopIteration = (global as any).StopIteration;
    
    try {
      // Set up StopIteration to make Q use the SpiderMonkey path
      (global as any).StopIteration = {};
      
      // Create a mock generator that throws StopIteration with done=true
      const returnValue = 42;
      
      // We need to create a fake generator object that simulates SpiderMonkey behavior
      // When "next" is called, it throws a StopIteration-like exception
      const fakeGenerator = {
        next: function() {
          const err: any = new Error("StopIteration");
          // result.done needs to be truthy for the original code path
          err.done = true;
          err.value = returnValue;
          throw err;
        }
      };
      
      // Q.async wraps a makeGenerator function
      // The makeGenerator should return our fake generator
      const asyncFn = Q.async(function(this: any) {
        return fakeGenerator;
      });
      
      const result = await asyncFn();
      
      // Original: result.done is true -> returns Q(exception.value) = Q(42) -> resolves to 42
      // Mutated: false -> returns reject(exception) -> rejects
      expect(result).toBe(returnValue);
    } finally {
      // Restore original StopIteration
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});