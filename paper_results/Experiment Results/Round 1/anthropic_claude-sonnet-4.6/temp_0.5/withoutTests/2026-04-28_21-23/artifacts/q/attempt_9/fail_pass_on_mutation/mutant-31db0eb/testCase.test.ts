describe("Q", () => {
  it("resolves promises correctly", (done) => {
    const origSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;
    // Ensure window is NOT defined so original takes else branch
    const origWindow = (global as any).window;
    delete (global as any).window;

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    (global as any).setImmediate = origSetImmediate;
    if (origWindow !== undefined) (global as any).window = origWindow;

    Q.resolve(42).then((val: number) => {
      expect(val).toBe(42);
      done();
    });
  });
});