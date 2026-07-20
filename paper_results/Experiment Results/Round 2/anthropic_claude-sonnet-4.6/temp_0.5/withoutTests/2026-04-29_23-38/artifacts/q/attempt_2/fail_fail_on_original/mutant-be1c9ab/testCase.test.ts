import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with Q.return in SpiderMonkey path", () => {
  it("should resolve with the return value when Q.return is used", async () => {
    // Force the SpiderMonkey path by defining StopIteration globally
    (global as any).StopIteration = {};
    
    try {
      const asyncFn = Q.async(function () {
        Q["return"](42);
      });
      
      const result = await asyncFn();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});