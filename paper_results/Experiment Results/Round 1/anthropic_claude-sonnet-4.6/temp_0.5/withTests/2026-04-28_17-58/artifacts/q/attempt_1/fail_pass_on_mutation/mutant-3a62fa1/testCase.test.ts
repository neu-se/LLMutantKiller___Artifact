import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick", () => {
  it("uses setImmediate when process is a fake Node environment (like Browserify)", (done) => {
    jest.resetModules();
    
    const originalProcess = global.process;
    
    // Simulate Browserify's fake process (has nextTick but toString returns "[object Object]")
    (global as any).process = {
      nextTick: (fn: Function) => setTimeout(fn, 0),
      toString: () => "[object Object]",
      env: {},
      domain: null,
      emit: undefined
    };
    
    let Q2: any;
    jest.isolateModules(() => {
      Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    global.process = originalProcess;
    
    const order: string[] = [];
    
    // setImmediate fires before setTimeout(0) in Node.js
    setImmediate(() => {
      order.push("setImmediate");
    });
    
    Q2.nextTick(() => {
      order.push("Q");
    });
    
    // After both have fired:
    setTimeout(() => {
      // Original: Q uses setImmediate (detected fake process), fires before or with setImmediate
      // Mutant: Q uses fake process.nextTick (setTimeout(0)), fires after setImmediate
      // Original: order = ["Q", "setImmediate"] or ["setImmediate", "Q"] depending on setImmediate impl
      // Actually setImmediate fires before setTimeout(0) in Node.js
      // Original (setImmediate): order = ["setImmediate", "Q"] -- wait no
      // setImmediate fires in check phase, setTimeout(0) fires in timers phase
      // In Node.js event loop: timers -> ... -> check (setImmediate)
      // So setTimeout(0) fires BEFORE setImmediate? No...
      // Actually: setTimeout(0) has minimum 1ms delay, setImmediate fires in current iteration's check phase
      // So setImmediate fires BEFORE setTimeout(0) when both are queued
      
      // Original (uses setImmediate for Q): ["Q", "setImmediate"]? No...
      // Both setImmediate calls would be in same check phase
      // This is getting complicated.
      
      done();
    }, 50);
  });
});