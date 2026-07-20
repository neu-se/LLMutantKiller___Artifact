import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with StopIteration", () => {
  it("should resolve with the return value when using Q.return in SpiderMonkey-style generators", async () => {
    // Set up StopIteration globally to trigger the SpiderMonkey code path
    (global as any).StopIteration = {};
    
    try {
      const asyncFn = Q.async(function* () {
        Q["return"](42);
      });
      
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});