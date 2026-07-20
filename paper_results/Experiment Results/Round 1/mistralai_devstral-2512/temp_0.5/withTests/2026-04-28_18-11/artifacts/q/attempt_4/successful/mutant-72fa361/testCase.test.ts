import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong functionality", () => {
  it("should extend error stack traces with promise chain information when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let capturedError: any = null;

    // Set up error handler to capture the error
    (Q as any).onerror = (error: Error) => {
      capturedError = error;
    };

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain that will reject
    deferred1.promise
      .then(() => deferred2.promise)
      .then(() => {
        throw new Error("Test error");
      })
      .done();

    // Reject the first deferred to trigger the chain
    deferred1.reject(new Error("Initial rejection"));

    // Wait for the error to propagate
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify the error was captured and has extended stack trace
    expect(capturedError).not.toBeNull();
    expect(capturedError.stack).toBeDefined();
    expect(capturedError.stack.length).toBeGreaterThan(0);
    expect(capturedError.stack).toContain("From previous event");

    // Clean up
    Q.longStackSupport = false;
    (Q as any).onerror = null;
  });
});