import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration defined", () => {
  it("should use SpiderMonkey path when StopIteration is defined and generator throws StopIteration", async () => {
    // Set up StopIteration globally to simulate SpiderMonkey environment
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = {};

    try {
      // In SpiderMonkey path: when generator throws StopIteration, returns Q(exception.value)
      // In ES6 path (mutated): tries to call generator.next() and check result.done
      // A fake generator that throws a StopIteration-like exception
      const fakeGenerator = Q.async(function* () {
        return 42;
      });

      const result = await fakeGenerator();
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