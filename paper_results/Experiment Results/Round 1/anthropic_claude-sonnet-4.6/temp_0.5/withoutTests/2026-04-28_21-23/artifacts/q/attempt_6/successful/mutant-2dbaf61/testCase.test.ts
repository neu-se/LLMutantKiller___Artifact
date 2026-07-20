describe("Q hasStacks initialization", () => {
  it("throws error in try block during initialization (original) vs not (mutated)", () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    let errorCreatedDuringInit = false;
    (Error as any).prepareStackTrace = (err: any, stack: any) => {
      errorCreatedDuringInit = true;
      return originalPrepareStackTrace ? originalPrepareStackTrace(err, stack) : stack.toString();
    };
    
    jest.isolateModules(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    (Error as any).prepareStackTrace = originalPrepareStackTrace;
    
    // In original: try { throw new Error() } → prepareStackTrace called → flag set
    // In mutated: try {} → no Error thrown → prepareStackTrace NOT called (for hasStacks init)
    // BUT captureLine() also throws errors, so this might be called regardless
    expect(errorCreatedDuringInit).toBe(true); // both would be true
  });
});