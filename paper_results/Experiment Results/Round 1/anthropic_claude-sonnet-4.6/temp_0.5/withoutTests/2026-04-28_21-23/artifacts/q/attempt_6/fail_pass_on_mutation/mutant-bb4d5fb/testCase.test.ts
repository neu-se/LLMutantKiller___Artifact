import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame mutation", () => {
  it("stack modification occurs and preserves non-Q frames", async () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    // Capture promise stack to verify it was set
    const promiseStack = (d.promise as any).stack;
    
    // If promise has no stack, makeStackTraceLong won't run
    // Skip test if stacks not supported
    if (!promiseStack) {
      return; // Can't test without stack support
    }

    function uniqueNamedFunction() {
      d.reject(new Error("test"));  
    }
    uniqueNamedFunction();

    let capturedError: any;
    await new Promise<void>((resolve) => {
      d.promise.then(null, (e: any) => {
        capturedError = e;
        resolve();
      });
    });

    // Verify makeStackTraceLong actually ran by checking stack was modified
    expect(capturedError.stack).toContain("From previous event:");
    // And user frame should be preserved (original) vs filtered (mutation)
    expect(capturedError.stack).toContain("uniqueNamedFunction");
  });
});