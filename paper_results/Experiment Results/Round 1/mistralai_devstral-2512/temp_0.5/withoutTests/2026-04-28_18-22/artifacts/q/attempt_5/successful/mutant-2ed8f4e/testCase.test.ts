const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation", () => {
  it("should filter stack traces and preserve non-internal frames", () => {
    // Enable long stack traces to trigger the filterStackString function
    Q.longStackSupport = true;

    // Create a nested promise rejection to generate a multi-frame stack
    const promise = Q.delay(1).then(() => {
      throw new Error("test error");
    });

    return promise.catch((error: Error) => {
      const stack = error.stack;

      // The mutation makes filterStackString return empty string
      // which would result in losing all stack frames
      // In the original code, we should still have some frames after filtering
      expect(stack).toBeDefined();
      expect(stack!.length).toBeGreaterThan(0);

      // The stack should contain our test error frame
      expect(stack).toContain("test error");

      // But should not contain Q internal frames
      expect(stack).not.toContain("at Promise.promiseDispatch");
      expect(stack).not.toContain("at nextTick");

      return "recovered";
    });
  });
});