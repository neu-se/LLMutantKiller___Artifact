import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("should not filter out user stack frames from non-Q files in long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedStack: string = "";

    function deepUserFunction(): Promise<never> {
      const deferred = Q.defer();
      // Use a setTimeout to create a cross-tick rejection so makeStackTraceLong is invoked
      setTimeout(() => {
        deferred.reject(new Error("deep rejection"));
      }, 0);
      return deferred.promise;
    }

    function outerUserFunction(): Promise<never> {
      return Q().then(() => {
        return deepUserFunction();
      });
    }

    await outerUserFunction().then(
      null,
      (err: Error) => {
        capturedStack = err.stack || "";
      }
    );

    Q.longStackSupport = false;

    // With original code: isInternalFrame only returns true for lines IN q.js itself.
    // User code frames are preserved.
    // With mutated code: isInternalFrame returns true for ANY line where lineNumber <= qEndingLine
    // (~2000+), so virtually all user frames get filtered out, leaving an empty or near-empty stack.
    // The stack should contain references to user functions.
    expect(capturedStack.length).toBeGreaterThan(0);
    
    // Count non-empty lines in the stack
    const stackLines = capturedStack.split("\n").filter(line => line.trim().length > 0);
    
    // With original: user frames are kept, so we have meaningful stack lines
    // With mutation: nearly all lines are filtered (lineNumber <= ~2000 is almost always true)
    // leaving very few or no lines
    expect(stackLines.length).toBeGreaterThan(1);
    
    // The error message line should be there, plus at least one frame from user code
    // With mutation, frames from this test file (small line numbers) get filtered
    expect(capturedStack).toMatch(/deepUserFunction|outerUserFunction/);
  });
});