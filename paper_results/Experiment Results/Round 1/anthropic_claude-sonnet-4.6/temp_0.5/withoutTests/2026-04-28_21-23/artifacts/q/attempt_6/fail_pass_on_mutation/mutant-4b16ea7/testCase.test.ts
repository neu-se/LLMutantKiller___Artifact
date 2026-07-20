import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("uses window-bound setImmediate in original code", (done) => {
    const origNextTick = process.nextTick;
    (process as any).nextTick = undefined;
    jest.resetModules();

    const thisValues: any[] = [];
    const origSetImmediate = (global as any).setImmediate;
    (global as any).setImmediate = function(this: any, fn: any) {
      thisValues.push(this);
      return origSetImmediate(fn);
    };

    import("../../../../../../../../../../../subject_repositories/q/q.js").then((mod: any) => {
      process.nextTick = origNextTick;
      const QNew = mod.default || mod;
      QNew.nextTick(() => {
        (global as any).setImmediate = origSetImmediate;
        expect(thisValues[0]).toBe((global as any).window);
        done();
      });
    });
  });
});