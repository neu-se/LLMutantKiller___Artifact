import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate scheduling", () => {
  it("uses setImmediate for nextTick, observable via setImmediate spy", (done) => {
    const original = global.setImmediate;
    let setImmediateCalled = false;
    
    (global as any).setImmediate = function(...args: any[]) {
      setImmediateCalled = true;
      return original.apply(this, args);
    };
    
    Q.nextTick(() => {
      (global as any).setImmediate = original;
      expect(setImmediateCalled).toBe(true);
      done();
    });
  });
});