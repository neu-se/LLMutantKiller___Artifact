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
      (e) => {
        const stack = e.stack;
        expect(stack).toBeDefined();

        // In the original code, internal Q frames should be filtered out
        // In the mutated code, the loop is empty so no filtering happens
        // We can detect this by checking if the stack contains Q internal markers
        const hasQInternalFrames = stack.includes("q.js") || stack.includes("From previous event");
        expect(hasQInternalFrames).toBe(false);

        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});