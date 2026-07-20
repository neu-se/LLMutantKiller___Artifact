describe("Q nextTick setup without setImmediate", () => {
  it("should initialize without error when setImmediate is not available and window is not defined", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;
    
    jest.resetModules();
    
    let Q: any;
    let error: Error | null = null;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } catch (e) {
      error = e as Error;
    } finally {
      (global as any).setImmediate = originalSetImmediate;
    }
    
    expect(error).toBeNull();
    expect(Q).toBeDefined();
  });
});