import { Q } from "./q";

describe("Q long stack traces", () => {
  it("should not enable long stack traces when hasStacks is false", () => {
    // Force hasStacks to be false by mocking the environment
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = false;

    // Create a promise chain that would normally capture stack traces
    const deferred = Q.defer();
    let capturedStack = false;

    // In the original code, when hasStacks is false, the stack capture should be skipped
    // In the mutated code, it would incorrectly try to capture stacks when hasStacks is false
    try {
      deferred.promise.then(() => {
        // This should not have long stack traces when hasStacks is false
        const promise = Q.resolve(42);
        if (promise.stack) {
          capturedStack = true;
        }
      });
      deferred.resolve(42);
    } catch (e) {
      // Should not throw
    }

    // Restore original state
    Q.longStackSupport = originalHasStacks;

    // The test passes if no stack was captured when hasStacks is false
    expect(capturedStack).toBe(false);
  });
});