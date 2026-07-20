import { Q } from "./q";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    let capturedStack: string | undefined;

    // Force long stack traces to be enabled for testing
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a rejection with a stack trace
      const error = new Error("Test error");
      deferred.reject(error);

      // Handle the rejection to capture the stack
      deferred.promise.then(
        () => {},
        (err) => {
          capturedStack = err.stack;
        }
      );

      // Give the promise time to settle
      return Q.delay(10).then(() => {
        expect(capturedStack).toBeDefined();
        // The stack should contain meaningful frame information
        expect(capturedStack!.includes("at ")).toBe(true);
        // Should have parsed line numbers (not empty arrays)
        expect(capturedStack!.split("\n").some(line => /at .+ \(\w+:\d+:\d+\)/.test(line))).toBe(true);
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});