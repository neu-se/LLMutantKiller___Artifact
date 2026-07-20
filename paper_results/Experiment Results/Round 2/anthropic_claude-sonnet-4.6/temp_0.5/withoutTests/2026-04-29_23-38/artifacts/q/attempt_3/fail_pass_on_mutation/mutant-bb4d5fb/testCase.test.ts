import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("long stack traces should include frames from user code files", async () => {
    Q.longStackSupport = true;

    // Create a promise chain that will produce a long stack trace
    let capturedError: any;

    const p = Q.fcall(function level1() {
      return Q.fcall(function level2() {
        throw new Error("deep error");
      });
    });

    await p.fail(function(err: any) {
      capturedError = err;
    });

    expect(capturedError).toBeDefined();
    const stack: string = capturedError.stack || "";
    
    // The stack should contain "level1" or "level2" function names from this file
    // With mutation: all frames filtered because lineNumber <= qEndingLine (~1000+)
    // With original: only Q's own frames filtered, user frames preserved
    expect(stack.length).toBeGreaterThan(0);
    // At minimum the error message line should be there
    expect(stack).toContain("deep error");
    // User function names should appear in the stack
    expect(stack).toMatch(/level1|level2|testCase/);
  });
});