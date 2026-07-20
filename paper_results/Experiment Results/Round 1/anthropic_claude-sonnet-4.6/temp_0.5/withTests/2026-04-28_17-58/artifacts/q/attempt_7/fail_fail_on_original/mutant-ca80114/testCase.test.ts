describe("Q flush behavior", () => {
  it("should continue processing tasks after one throws when using setImmediate path", done => {
    // Load Q with isNodeJS=false by hiding process.nextTick
    const origNextTick = process.nextTick;
    (process as any).nextTick = undefined;
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    (process as any).nextTick = origNextTick;
    
    const results: number[] = [];
    
    const uncaughtHandler = () => {};
    process.on("uncaughtException", uncaughtHandler);
    
    Q.nextTick(() => { throw new Error("boom"); });
    Q.nextTick(() => { results.push(1); });
    
    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      expect(results).toEqual([1]);
      done();
    }, 500);
  });
});