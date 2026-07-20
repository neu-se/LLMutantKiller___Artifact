import { Q } from "./q.js";

describe("Q promise stack trace handling", () => {
  it("should include promise stack traces in error when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorWithStack: Error | undefined;

    try {
      // Create a chain of promises that will eventually reject
      const deferred1 = Q.defer();
      const deferred2 = Q.defer();

      // Create a promise chain
      const promise = deferred1.promise
        .then(() => deferred2.promise)
        .then(() => {
          throw new Error("Test error");
        });

      // Resolve the first deferred to start the chain
      deferred1.resolve(null);
      deferred2.resolve(null);

      // Wait for the promise to reject
      await promise;
    } catch (error) {
      errorWithStack = error as Error;
    }

    // Verify that the error was caught
    expect(errorWithStack).toBeDefined();
    expect(errorWithStack!.message).toBe("Test error");

    // The original code should include promise stack traces in the error stack
    // The mutated code (empty function) should not modify the stack
    const stackLines = errorWithStack!.stack!.split('\n');
    const hasStackJumpSeparator = stackLines.some(line =>
      line.includes("From previous event:")
    );

    // In the original code, this should be true (stack traces are concatenated)
    // In the mutated code, this should be false (stack traces are not modified)
    expect(hasStackJumpSeparator).toBe(true);
  });
});