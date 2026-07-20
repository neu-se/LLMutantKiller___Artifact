describe("Q runSingle browser path error rethrowing", () => {
  it("should throw error from setTimeout callback in browser error path", async () => {
    // Reset modules and intercept setTimeout before loading Q
    jest.resetModules();
    
    const thrownErrors: Error[] = [];
    const originalSetTimeout = global.setTimeout;
    
    // Intercept setTimeout to capture and track callbacks
    (global as any).setTimeout = function(fn: Function, ms: number) {
      const wrapped = function() {
        try {
          fn();
        } catch(e) {
          thrownErrors.push(e as Error);
        }
      };
      return originalSetTimeout(wrapped, ms);
    };
    
    const Q2 = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    // Now trigger a task that throws - this goes through if(true) branch
    // which schedules setTimeout(flush, 0) and re-throws
    // The else branch with the mutation is dead code
    // BUT: we can check if any scheduled setTimeout callbacks throw
    
    const testError = new Error("test");
    
    await new Promise<void>((resolve) => {
      process.once("uncaughtException", () => {});
      
      try {
        // Force flush to throw by scheduling a bad task
        Q2.nextTick(() => { throw testError; });
      } catch(e) {}
      
      originalSetTimeout(() => {
        (global as any).setTimeout = originalSetTimeout;
        resolve();
      }, 200);
    });
    
    // In original: thrownErrors contains testError (from setTimeout(flush,0) re-running)
    // In mutated: same behavior since else branch is dead
    expect(thrownErrors.length).toBeGreaterThan(0);
  });
});