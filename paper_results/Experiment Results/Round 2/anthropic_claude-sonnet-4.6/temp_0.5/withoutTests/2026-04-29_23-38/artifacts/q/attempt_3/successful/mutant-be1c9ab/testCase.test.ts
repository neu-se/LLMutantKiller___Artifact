import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with Q.return in SpiderMonkey path", () => {
  it("should resolve with the return value when Q.return is used", async () => {
    (global as any).StopIteration = {};
    
    try {
      const result = await Q.async(function* () {
        Q["return"](42);
      })();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});