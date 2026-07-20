import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should preserve non-internal stack frames in long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise(function (resolve, reject) {
        reject(new Error("test error from user code"));
      }).then(null, function (err: Error) {
        // Re-throw to capture the error with potentially extended stack
        throw err;
      });
    } catch (e) {
      capturedError = e as Error;
    }

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    expect(capturedError!.message).toBe("test error from user code");

    // The stack should contain the test file name (non-internal frame)
    // In the original code, non-internal frames are preserved
    // In the mutated code, only internal Q frames are preserved (so user frames are stripped)
    const stack = capturedError!.stack || "";

    // The stack should contain some reference to user code (this test file)
    // Original: keeps non-internal frames (user code visible)
    // Mutated: keeps only internal frames (user code stripped, Q internals kept)
    // We check that the stack is non-empty and contains meaningful content
    expect(stack.length).toBeGreaterThan(0);

    // The stack should contain the error message
    expect(stack).toContain("test error from user code");

    // The stack should NOT be reduced to only Q-internal lines
    // In the original, user frames (like this test file) are preserved
    // In the mutated version, only Q internal frames survive filtering
    // So the stack should contain lines from this test file
    const lines = stack.split("\n").filter((line: string) => line.trim().length > 0);

    // There should be multiple lines in the stack
    expect(lines.length).toBeGreaterThan(1);

    // At least one line should reference user code (not q.js internal)
    // The test file itself should appear in the stack
    const hasUserCodeFrame = lines.some((line: string) => 
      line.includes("testCase.test") || 
      line.includes("Object.<anonymous>") ||
      line.includes("jest") ||
      (line.includes("at ") && !line.includes("q.js"))
    );

    // In original: user frames preserved, so hasUserCodeFrame should be true
    // In mutated: only internal Q frames kept, so user frames stripped
    expect(hasUserCodeFrame).toBe(true);
  });
});