const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces by excluding internal Q frames", () => {
    // Create a promise chain that will generate a stack trace with internal frames
    const promise = Q.resolve().then(() => {
      throw new Error("test error");
    });

    return promise.catch((error: Error) => {
      expect(error.stack).toBeDefined();

      const lines = error.stack?.split("\n") || [];
      const hasInternalFrame = lines.some((line: string) =>
        line.includes("q.js") &&
        !line.includes("testCase.test.ts") &&
        !line.includes("node_modules")
      );

      // In original code: internal frames should be filtered (hasInternalFrame = false)
      // In mutated code: internal frames will be included (hasInternalFrame = true)
      expect(hasInternalFrame).toBe(false);
      return null;
    });
  });
});