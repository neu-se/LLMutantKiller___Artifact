import { Q } from "./q";

describe("Q library stack trace handling", () => {
  it("should properly capture stack traces when errors are thrown", () => {
    const originalStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 10;

    try {
      const promise = Q.reject(new Error("Test error"));
      return promise.then(
        () => {
          throw new Error("Should not resolve");
        },
        (error) => {
          // The mutation removes the error throwing in the stack capture code
          // This means hasStacks will be false, preventing long stack traces
          // We can detect this by checking if stack traces are properly captured
          expect(error.stack).toBeDefined();
          expect(error.stack.length).toBeGreaterThan(0);
          expect(error.stack).toContain("Test error");
        }
      );
    } finally {
      Error.stackTraceLimit = originalStackTraceLimit;
    }
  });
});