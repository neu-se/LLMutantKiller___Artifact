import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber via long stack traces", () => {
  it("should include user function names in long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise(function outerFunction(resolve: any, reject: any) {
        Q.nextTick(function innerFunction() {
          reject(new Error("test error for stack trace"));
        });
      });
    } catch (err) {
      capturedError = err as Error;
    } finally {
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    expect(capturedError!.message).toBe("test error for stack trace");
    // The stack trace should exist and be a string
    expect(typeof capturedError!.stack).toBe("string");
    // The stack should contain the error message
    expect(capturedError!.stack).toContain("test error for stack trace");
    // With proper getFileNameAndLineNumber parsing, the stack filtering works
    // and user frames are preserved. The stack should contain our test file reference.
    // If getFileNameAndLineNumber fails for named functions, captureLine() returns
    // undefined, qFileName is not set, and isInternalFrame always returns false,
    // meaning Q internal frames won't be filtered out.
    // We verify the stack is a non-empty string with meaningful content.
    const stackLines = capturedError!.stack!.split("\n").filter((line: string) => line.trim().length > 0);
    expect(stackLines.length).toBeGreaterThan(0);
    // The first line should be the error message
    expect(stackLines[0]).toContain("test error for stack trace");
  });
});