import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration behavior in async generators", () => {
  it("should reject when a non-StopIteration exception is thrown in a generator", async () => {
    // Simulate SpiderMonkey environment by defining StopIteration global
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = {};

    try {
      const error = new Error("test error");
      
      // Create a mock generator that throws a non-StopIteration exception
      const mockGenerator = {
        next: () => { throw error; }
      };
      
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });
      
      const result = asyncFn();
      
      // With original code: non-StopIteration exception -> reject
      // With mutated code: non-StopIteration exception -> treated as StopIteration -> Q(undefined)
      await expect(result).rejects.toBe(error);
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});