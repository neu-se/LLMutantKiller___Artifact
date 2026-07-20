describe("Q", () => {
  it("should initialize correctly when setImmediate is not available", () => {
    const origSetImmediate = (global as any).setImmediate;
    const origWindow = (global as any).window;
    
    delete (global as any).setImmediate;
    delete (global as any).window;
    
    let error: any = null;
    let Q: any = null;
    
    jest.isolateModules(() => {
      try {
        Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch(e) {
        error = e;
      }
    });
    
    (global as any).setImmediate = origSetImmediate;
    if (origWindow !== undefined) (global as any).window = origWindow;
    
    expect(error).toBeNull();
    expect(Q).not.toBeNull();
  });
});