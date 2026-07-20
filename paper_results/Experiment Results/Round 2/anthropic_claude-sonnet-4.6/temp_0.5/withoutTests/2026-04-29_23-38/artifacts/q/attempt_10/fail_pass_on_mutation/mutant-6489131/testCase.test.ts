describe("Q reduce fallback", () => {
  it("should work when Array.prototype.reduce is unavailable and called without initial value through nfcall", async () => {
    const origReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    Array.prototype.reduce = origReduce;

    function nodeStyleFn(a: number, b: number, cb: Function) {
      cb(null, a + b);
    }

    const result = await Q.nfcall(nodeStyleFn, 3, 4);
    expect(result).toBe(7);
  });
});