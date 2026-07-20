describe("Q", () => {
  it("should load and work when setImmediate is not a function and window is not defined", () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    
    let Q: any;
    let error: any = null;
    jest.isolateModules(() => {
      try {
        Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch(e) {
        error = e;
      }
    });
    
    jest.useRealTimers();
    
    expect(error).toBeNull();
    expect(Q).toBeDefined();
  });
});