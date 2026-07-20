describe("Q nextTick", () => {
  it("detects mutation by checking behavior when process is temporarily undefined", async () => {
    const originalProcess = global.process;
    // @ts-ignore
    delete global.process;
    
    jest.resetModules();
    // Now load Q - original would skip Node path, mutated would throw
    let error: Error | null = null;
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      error = e as Error;
    } finally {
      global.process = originalProcess;
    }
    
    expect(error).toBeNull(); // original handles missing process gracefully
  });
});