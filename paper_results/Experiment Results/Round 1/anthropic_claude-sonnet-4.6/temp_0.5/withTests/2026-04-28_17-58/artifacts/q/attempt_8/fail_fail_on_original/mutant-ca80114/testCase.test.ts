import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q flush behavior in non-node mode", () => {
  it("continues processing after async error", done => {
    // Load Q fresh with isNodeJS=false
    const origNextTick = process.nextTick;
    (process as any).nextTick = undefined;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (process as any).nextTick = origNextTick;
    
    const results: number[] = [];
    
    // Prepend handler to intercept before Jest's handler
    const errHandler = (err: Error) => {
      if (err.message === "test-boom") return; // suppress our test error
    };
    process.prependListener('uncaughtException', errHandler);
    
    QFresh.nextTick(() => { throw new Error("test-boom"); });
    QFresh.nextTick(() => { results.push(1); });
    
    setTimeout(() => {
      process.removeListener('uncaughtException', errHandler);
      expect(results).toEqual([1]);
      done();
    }, 500);
  });
});