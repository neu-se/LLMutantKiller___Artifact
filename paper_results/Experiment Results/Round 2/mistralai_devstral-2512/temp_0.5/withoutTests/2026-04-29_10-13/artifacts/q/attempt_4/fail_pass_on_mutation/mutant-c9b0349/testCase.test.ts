const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter internal stack frames", () => {
    // Create a deep promise chain to generate multiple stack frames
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Add some operations to create more stack frames
    return promise
      .catch((e: any) => {
        // In the original code, internal Q frames should be filtered
        // In the mutated code, they won't be filtered (true && condition)
        const stack = e.stack;
        expect(stack).toBeDefined();

        // Count how many times "q.js" appears in the stack trace
        const qJsMatches = stack.split('\n').filter((line: string) =>
          line.includes('q.js') && !line.includes('node_modules')
        ).length;

        // The original code should filter most internal frames
        // The mutated code will keep all frames
        // We expect at most 2 q.js frames in original (error creation + rejection)
        // Mutated version will have many more
        expect(qJsMatches).toBeLessThan(5);

        // Also verify the error message is preserved
        expect(e.message).toBe("test error");
        return Q.resolve();
      });
  });
});