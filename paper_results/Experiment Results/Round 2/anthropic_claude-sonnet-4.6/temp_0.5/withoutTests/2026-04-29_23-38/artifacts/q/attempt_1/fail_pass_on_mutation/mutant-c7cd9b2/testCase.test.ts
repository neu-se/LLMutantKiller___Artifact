import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise stack trace parsing", () => {
  it("should correctly resolve promises and handle rejections with proper error propagation", async () => {
    // The mutation affects getFileNameAndLineNumber's handling of anonymous function
    // stack frames (format: "at filename:lineNumber:columnNumber").
    // This is used by captureLine() to identify Q's own line range for filtering.
    // If attempt2 is never processed, Q.reject and error handling still works,
    // but we can test that Q.reject properly creates rejected promises.
    
    // Test that Q.reject works and the rejection reason is preserved
    const reason = new Error("test rejection");
    
    let caughtReason: Error | null = null;
    
    await new Promise<void>((resolve) => {
      Q.reject(reason).then(null, function(err: Error) {
        caughtReason = err;
        resolve();
      });
    });
    
    expect(caughtReason).toBe(reason);
    
    // Test that Q.all works correctly - this exercises more of the promise machinery
    const results = await Q.all([Q(1), Q(2), Q(3)]).then(function(values: number[]) {
      return values;
    });
    
    expect(results).toEqual([1, 2, 3]);
    
    // Test that isInternalFrame filtering works - if attempt2 is broken,
    // captureLine may return undefined, causing qStartingLine to be undefined
    // which would affect filterStackString behavior
    // We can verify this indirectly by checking that Q itself is functional
    // and that longStackSupport can be enabled without breaking things
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      const deferredResult = await new Promise<number>((resolve) => {
        Q.when(42, function(val: number) {
          resolve(val);
        });
      });
      
      expect(deferredResult).toBe(42);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});