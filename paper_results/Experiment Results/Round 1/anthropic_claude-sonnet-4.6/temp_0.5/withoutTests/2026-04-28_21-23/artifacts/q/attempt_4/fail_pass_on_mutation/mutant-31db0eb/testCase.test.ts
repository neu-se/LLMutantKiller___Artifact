describe("Q initialization without setImmediate", () => {
  it("should not throw when setImmediate is undefined and window is undefined", () => {
    const orig = (global as any).setImmediate;
    delete (global as any).setImmediate;
    
    let error: any = null;
    jest.isolateModules(() => {
      try {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch(e) {
        error = e;
      }
    });
    
    (global as any).setImmediate = orig;
    expect(error).toBeNull();
  });
});