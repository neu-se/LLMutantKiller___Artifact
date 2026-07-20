describe("Q error handling", () => {
  it("detects mutation in browser error path by loading Q without process", async () => {
    jest.resetModules();
    jest.useFakeTimers();
    
    const thrownFromTimeout: Error[] = [];
    const realSetTimeout = global.setTimeout;
    
    // Capture setTimeout callbacks
    const timeoutCallbacks: Function[] = [];
    (global as any).setTimeout = (fn: Function, ms: number) => {
      timeoutCallbacks.push(fn);
      return 0;
    };
    
    // Hide process to force browser path (isNodeJS = false)
    const savedProcess = (global as any).process;
    (global as any).process = undefined;
    
    const Q2 = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    (global as any).process = savedProcess;
    (global as any).setTimeout = realSetTimeout;
    jest.useRealTimers();
    
    const err = new Error("browser path test");
    
    // Trigger a task that throws - now isNodeJS=false, so else branch runs
    // In original: setTimeout callback throws err
    // In mutated: setTimeout callback is empty
    Q2.nextTick(() => { throw err; });
    
    // Manually invoke captured setTimeout callbacks
    for (const cb of timeoutCallbacks) {
      try { cb(); } catch(e) { thrownFromTimeout.push(e as Error); }
    }
    
    expect(thrownFromTimeout).toContain(err);
  });
});