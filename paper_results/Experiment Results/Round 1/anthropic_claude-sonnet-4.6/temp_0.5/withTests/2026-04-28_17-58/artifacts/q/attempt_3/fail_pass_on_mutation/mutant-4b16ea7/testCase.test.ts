describe("Q setImmediate requestTick branch", () => {
  it("resolves promises correctly regardless of window environment", () => {
    jest.resetModules();
    (global as any).window = undefined;
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    return Q.fcall(() => 42).then((val: number) => {
      expect(val).toBe(42);
    });
  });
});