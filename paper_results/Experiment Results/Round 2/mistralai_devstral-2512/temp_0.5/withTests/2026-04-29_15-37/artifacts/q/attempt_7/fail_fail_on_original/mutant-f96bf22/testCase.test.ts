import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering behavior", () => {
  it("should produce shorter stack traces by filtering internal frames", async () => {
    // Enable long stack traces to ensure we get internal frames
    Q.longStackSupport = true;

    // Create a deeply nested promise chain to generate many internal frames
    let promise = Q.reject(new Error("test error"));
    for (let i = 0; i < 10; i++) {
      promise = promise.then(() => Q.reject(new Error("test error")));
    }

    try {
      await promise;
      fail("Should have thrown an error");
    } catch (caughtError: unknown) {
      if (!(caughtError instanceof Error)) {
        fail("Expected an Error object");
        return;
      }

      const stack = caughtError.stack;
      if (!stack) {
        fail("Expected a stack trace");
        return;
      }

      // Count the number of stack frames
      const frameCount = stack.split('\n').length;

      // Original code: should have fewer frames due to filtering (< 20)
      // Mutated code: will have more frames (>= 20) since nothing is filtered
      expect(frameCount).toBeLessThan(20);
    } finally {
      Q.longStackSupport = false;
    }
  });
});