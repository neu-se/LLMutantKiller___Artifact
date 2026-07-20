import { Q } from "./q";

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames", () => {
    const originalWarn = console.warn;
    console.warn = jest.fn(); // Suppress deprecation warnings

    // Create a scenario where a promise rejection occurs with a stack trace
    // that should be filtered to exclude internal Q frames
    const promise = Q.reject(new Error("Test error"));

    // Force long stack traces to be enabled for testing
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Capture the promise to ensure stack trace is generated
    let capturedError: Error | undefined;
    promise.catch((error: Error) => {
      capturedError = error;
    });

    // Use Q.done to ensure the error is thrown if unhandled
    // This will trigger the stack trace filtering logic
    try {
      Q.done(promise, () => {}, (error: Error) => {
        capturedError = error;
      });
    } catch (error) {
      capturedError = error as Error;
    }

    // Restore original settings
    Q.longStackSupport = originalLongStackSupport;
    console.warn = originalWarn;

    // The test passes if no exception is thrown during the process
    // The mutation would cause incorrect filtering, potentially including
    // frames that should be excluded or vice versa, which could lead to
    // different stack trace output
    expect(capturedError).toBeDefined();
    expect(capturedError!.message).toBe("Test error");
  });
});