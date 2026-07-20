import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with SpiderMonkey-style generators", () => {
  it("should correctly pass the generator result to the when callback when StopIteration is defined", async () => {
    // Force the SpiderMonkey path by defining StopIteration globally
    const originalStopIteration = (global as any).StopIteration;
    
    // Create a mock StopIteration to trigger the SpiderMonkey branch
    (global as any).StopIteration = {};

    try {
      // Create a mock generator that returns a value on "next"
      const mockGenerator = {
        next: jest.fn().mockReturnValue(42),
        throw: jest.fn()
      };

      let capturedResult: any;
      
      // Manually invoke the SpiderMonkey path logic
      // In the SpiderMonkey branch: result = generator[verb](arg), then when(result, callback, errback)
      // With mutation: result stays undefined, so when(undefined, ...) is called
      
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });

      // The key: in SpiderMonkey path, generator.next() result is passed to when()
      // With mutation, undefined is passed instead
      const result = await asyncFn();
      
      // result should be 42 (from generator.next() returning 42)
      // With mutation, result would be undefined
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