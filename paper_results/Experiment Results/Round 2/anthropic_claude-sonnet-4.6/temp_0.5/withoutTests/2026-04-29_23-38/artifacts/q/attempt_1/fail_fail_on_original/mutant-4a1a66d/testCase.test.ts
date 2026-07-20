import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration defined", () => {
  it("should use SpiderMonkey generator path when StopIteration is defined", async () => {
    // Define StopIteration globally to simulate SpiderMonkey environment
    const originalStopIteration = (global as any).StopIteration;
    
    // Create a mock StopIteration class
    class MockStopIteration {
      value: any;
      constructor(value?: any) {
        this.value = value;
      }
    }
    (global as any).StopIteration = MockStopIteration;
    
    try {
      // In original code: StopIteration is defined, so it uses SpiderMonkey path
      // In mutated code: always uses ES6 path (if true)
      // The SpiderMonkey path catches StopIteration exceptions as return values
      // The ES6 path checks result.done property
      
      // Create a generator that throws StopIteration (SpiderMonkey style)
      const mockGenerator = {
        next: () => { throw new MockStopIteration(42); },
        throw: (e: any) => { throw e; }
      };
      
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });
      
      // In original: StopIteration is defined, uses SpiderMonkey path, catches StopIteration -> resolves with 42
      // In mutated: always uses ES6 path, tries result.done -> throws because result is undefined
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});