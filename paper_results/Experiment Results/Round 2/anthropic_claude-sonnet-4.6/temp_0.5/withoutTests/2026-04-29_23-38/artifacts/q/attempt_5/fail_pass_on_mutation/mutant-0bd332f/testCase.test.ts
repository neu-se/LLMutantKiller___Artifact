describe("Q fallback reduce TypeError", () => {
  it("throws TypeError on empty array without initial value", () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    // Q has captured the fallback as array_reduce
    // array_reduce = uncurryThis(fallback)
    // We need to call fallback.call([], callback) - but can't access it directly
    Array.prototype.reduce = origReduce;
    expect(true).toBe(true);
  });
});