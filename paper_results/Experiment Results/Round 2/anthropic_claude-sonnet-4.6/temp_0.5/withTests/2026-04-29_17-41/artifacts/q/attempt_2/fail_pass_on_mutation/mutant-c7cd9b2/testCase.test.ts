import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering of Q internal frames", () => {
  it("should filter Q internal frames from long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    await new Promise<void>((resolve) => {
      Q.reject(new Error("sentinel error")).fail((err: any) => {
        caughtError = err;
        resolve();
      });
    });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    expect(caughtError.stack).toBeDefined();

    // With the original code, captureLine() correctly identifies Q's line range,
    // so Q internal frames (lines from q.js) are filtered out of the stack.
    // With the mutated code, attempt2 never matches, captureLine() returns undefined,
    // qStartingLine is undefined, isInternalFrame always returns false,
    // and Q's own frames remain in the filtered stack.
    const stackLines: string[] = caughtError.stack.split("\n");
    const qInternalFrames = stackLines.filter((line: string) => 
      line.includes("q.js") && !line.includes("testCase.test.ts")
    );

    // Original: Q internal frames are filtered out, so none should appear
    // Mutated: Q internal frames are NOT filtered, so they will appear
    expect(qInternalFrames.length).toBe(0);
  });
});