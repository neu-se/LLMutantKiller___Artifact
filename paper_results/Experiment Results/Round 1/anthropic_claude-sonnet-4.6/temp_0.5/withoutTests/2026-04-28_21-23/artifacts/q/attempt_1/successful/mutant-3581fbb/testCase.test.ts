import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should preserve non-internal, non-node frames in stack traces when using long stack support", async () => {
    // Enable long stack support to trigger makeStackTraceLong -> filterStackString
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise((resolve, reject) => {
        reject(new Error("test rejection"));
      }).then(() => {
        // fulfilled handler - not called
      });
    } catch (e) {
      capturedError = e as Error;
    }

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    expect(capturedError!.stack).toBeDefined();

    // The stack should contain the test file name (user code frame)
    // In original: user frames are kept (not internal, not node frames)
    // In mutated: only node frames (module.js, node.js) are kept, so user frames are removed
    const stack = capturedError!.stack!;

    // The stack should contain something from the test file itself
    // (a non-node, non-internal frame), which the original preserves but the mutation removes
    expect(stack).toMatch(/testCase\.test|at.*:\d+:\d+/);

    // More specifically, the stack should NOT be empty of meaningful frames
    // Split into lines and check that we have lines that are not just node internal frames
    const lines = stack.split("\n").filter(line => line.trim().length > 0);
    
    // With original: lines contain user code frames (no module.js/node.js)
    // With mutation: only node internal frames survive filtering
    const hasUserCodeFrame = lines.some(line => 
      line.includes("testCase.test") || 
      (line.includes("at ") && !line.includes("(module.js:") && !line.includes("(node.js:") && line.trim() !== "")
    );

    expect(hasUserCodeFrame).toBe(true);
  });
});