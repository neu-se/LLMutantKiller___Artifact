import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter out internal and node frames from stack traces", () => {
    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will be rejected
    const promise = deferred.promise.then(() => {
      throw error;
    });

    // Force the promise to be rejected
    deferred.resolve();

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (e: Error) => {
        const stack = e.stack || "";
        expect(stack).toBeDefined();

        // Check for the specific pattern that indicates filtering happened
        // In the original code, the stack should contain "From previous event" separators
        // In the mutated code, these won't be present because no filtering occurs
        const hasPreviousEventSeparator = stack.includes("From previous event");
        expect(hasPreviousEventSeparator).toBe(true);

        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});