describe("Q flush continues after error in non-node environment", () => {
  it("should process all queued nextTick tasks even when one throws", done => {
    const origToString = process.toString;
    (process as any).toString = () => "[object Object]";
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (process as any).toString = origToString;

    const results: number[] = [];

    Q.nextTick(() => { throw new Error("boom"); });
    Q.nextTick(() => { results.push(1); });

    setTimeout(() => {
      expect(results).toEqual([1]);
      done();
    }, 300);
  });
});