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

        // Count the number of lines in the stack trace
        const lineCount = stack.split('\n').length;

        // In the original code, internal frames are filtered out, resulting in fewer lines
        // In the mutated code, no filtering happens, resulting in more lines
        // We expect the original to have fewer than 10 lines (filtered)
        // The mutated version will have more lines (unfiltered)
        expect(lineCount).toBeLessThan(10);

        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});