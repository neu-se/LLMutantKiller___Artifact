import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should not include empty lines in filtered stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    const error = new Error("test rejection");
    
    const rejectedPromise = Q.reject(error);
    
    let caughtError: any = null;
    
    await new Promise<void>((resolve) => {
      rejectedPromise.then(null, function(err: any) {
        caughtError = err;
        resolve();
      });
    });

    // The error should have been caught
    expect(caughtError).toBeTruthy();
    
    if (caughtError && caughtError.stack) {
      const stackLines = caughtError.stack.split("\n");
      // Original code filters out empty lines (due to `&& line` condition)
      // Mutated code includes all lines including empty ones
      // So with the original, there should be no empty lines in the stack
      const emptyLines = stackLines.filter((line: string) => line === "");
      expect(emptyLines.length).toBe(0);
    }
    
    Q.longStackSupport = false;
  });
});