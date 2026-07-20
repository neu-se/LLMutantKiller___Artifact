import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame filtering behavior", () => {
  it("should preserve user code stack frames in long stack traces and not filter everything out", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function userFunction() {
      return Q.reject(new Error("test rejection from user code"));
    }

    await new Promise<void>((resolve) => {
      userFunction()
        .fail((err: Error) => {
          capturedError = err;
          resolve();
        })
        .done();
    });

    expect(capturedError).not.toBeNull();
    
    // With the original code, isInternalFrame only filters Q's own internal frames,
    // so the error stack should still contain meaningful content.
    // With the mutation (always returning true), ALL frames are filtered as "internal",
    // resulting in an empty or near-empty stack string.
    const stack = capturedError!.stack || "";
    
    // The stack should contain the error message at minimum
    expect(stack.length).toBeGreaterThan(0);
    
    // More importantly, the stack should contain lines that reference actual code
    // (not just the error message line). With mutation, filterStackString removes
    // ALL lines since isInternalFrame returns true for everything.
    // We verify by checking that the stack has content beyond just the first line.
    const stackLines = stack.split("\n").filter((line: string) => line.trim().length > 0);
    
    // With original: user frames are preserved, so we get multiple lines
    // With mutation: all frames filtered as internal, leaving very few or no lines
    expect(stackLines.length).toBeGreaterThan(1);
    
    Q.longStackSupport = false;
  });
});