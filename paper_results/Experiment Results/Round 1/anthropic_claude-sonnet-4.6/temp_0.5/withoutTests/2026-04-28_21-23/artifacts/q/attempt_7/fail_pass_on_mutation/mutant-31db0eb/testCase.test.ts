describe("Q", () => {
  it("should handle promise resolution when MessageChannel is available but setImmediate is not", (done) => {
    const origSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;
    
    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    (global as any).setImmediate = origSetImmediate;
    
    Q.resolve(99).then((v: number) => {
      expect(v).toBe(99);
      done();
    });
  });
});