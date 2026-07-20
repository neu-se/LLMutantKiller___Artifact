import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration defined", () => {
  it("should use the SpiderMonkey generator path when StopIteration is defined", async () => {
    // In the original code: if (typeof StopIteration === "undefined") uses ES6 path
    // when StopIteration IS defined, it falls to the else (SpiderMonkey) path
    // In the mutated code: if (true) always uses ES6 path
    
    // Define StopIteration globally to simulate SpiderMonkey environment
    const globalAny = global as any;
    const originalStopIteration = globalAny.StopIteration;
    
    // Create a fake StopIteration constructor
    function FakeStopIteration(this: any, value: any) {
      this.value = value;
    }
    globalAny.StopIteration = FakeStopIteration;
    
    // Also need ReturnValue to be defined so QReturnValue = ReturnValue
    // Actually Q uses QReturnValue internally for _return
    
    try {
      // Create a mock generator that throws a StopIteration-like exception
      // to simulate SpiderMonkey generator completion
      const stopIterationValue = 42;
      
      const mockGenerator = {
        next: function() {
          // Simulate SpiderMonkey generator that throws StopIteration on completion
          const err = new FakeStopIteration(stopIterationValue);
          throw err;
        }
      };
      
      let generatorCreated = false;
      const asyncFn = Q.async(function(this: any) {
        generatorCreated = true;
        return mockGenerator;
      });
      
      const result = await asyncFn();
      
      // In original code (SpiderMonkey path): catches StopIteration and returns Q(exception.value) = 42
      // In mutated code (ES6 path always): tries result.done which throws because mockGenerator.next() throws non-StopIteration
      // Actually the ES6 path would catch the exception and reject
      expect(result).toBe(stopIterationValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete globalAny.StopIteration;
      } else {
        globalAny.StopIteration = originalStopIteration;
      }
    }
  });
});