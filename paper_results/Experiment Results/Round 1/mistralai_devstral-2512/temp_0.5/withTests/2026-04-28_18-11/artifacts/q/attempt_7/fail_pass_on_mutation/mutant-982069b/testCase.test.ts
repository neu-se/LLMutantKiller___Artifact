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

        // Count the number of lines in the stack trace that contain "q.js"
        // In the original code, these should be filtered out (count should be 0)
        // In the mutated code, they won't be filtered (count will be > 0)
        const qLines = stack.split('\n').filter(line => line.includes("q.js"));
        expect(qLines.length).toBe(0);

        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});