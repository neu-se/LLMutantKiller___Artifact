import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle the stack trace condition", async () => {
    // This test targets the mutation in makeStackTraceLong where:
    // Original: if (hasStacks && promise.stack && typeof error === "object" && ...)
    // Mutated:  if (hasStacks && promise.stack || typeof error === "object" && ...)

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a scenario where we have:
    // 1. hasStacks = true (we're in an environment with stack traces)
    // 2. promise.stack exists (we'll create a promise with a stack)
    // 3. error is NOT an object (we'll use a string error)

    const stringError = "This is a string error, not an object";
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise will have a stack trace because longStackSupport is enabled
    // but the error is a string, not an object

    setTimeout(() => {
      deferred.reject(stringError);
    }, 10);

    try {
      await promise;
      fail("Promise should have rejected");
    } catch (e) {
      // In the original code, this condition should NOT be met:
      // hasStacks && promise.stack && typeof error === "object"
      // because typeof stringError === "object" is false

      // In the mutated code, this condition WOULD be met:
      // hasStacks && promise.stack || typeof error === "object"
      // because hasStacks && promise.stack evaluates to true

      // This difference in behavior is what we're testing
      expect(e).toBe(stringError);
    } finally {
      Q.longStackSupport = false;
    }
  });
});