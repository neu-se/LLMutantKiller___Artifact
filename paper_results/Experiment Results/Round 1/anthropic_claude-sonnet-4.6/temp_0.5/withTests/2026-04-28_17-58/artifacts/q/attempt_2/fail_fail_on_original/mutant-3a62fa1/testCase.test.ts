import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick process detection", () => {
  it("uses setImmediate when process is a function (not an object), not process.nextTick", (done) => {
    jest.resetModules();

    const savedProcess = (global as any).process;

    // Make process a function (typeof === "function", not "object")
    // but with nextTick and toString that would pass the remaining conditions
    const fakeProcess: any = function () {};
    fakeProcess.nextTick = (fn: Function) => { setTimeout(fn, 0); };
    fakeProcess.toString = () => "[object process]";
    fakeProcess.env = {};
    fakeProcess.domain = null;
    (global as any).process = fakeProcess;

    let loadedQ: any;
    jest.isolateModules(() => {
      loadedQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    (global as any).process = savedProcess;

    const order: string[] = [];

    // setImmediate fires before setTimeout(0) in Node.js
    setImmediate(() => {
      order.push("setImmediate");
    });

    loadedQ.nextTick(() => {
      order.push("Q");
    });

    setTimeout(() => {
      // Original: process is a function, typeof !== "object", skips Node branch
      //   → uses setImmediate → Q fires with/before setImmediate
      //   order: ["Q", "setImmediate"] or ["setImmediate", "Q"] but both in same batch
      // Mutant: true → uses fakeProcess.nextTick (setTimeout(0))
      //   → setImmediate fires BEFORE setTimeout(0)
      //   order: ["setImmediate", "Q"]
      //
      // Original uses setImmediate, so Q and the test's setImmediate are both
      // in the check phase - Q's setImmediate was registered first, so fires first
      // order should be: ["Q", "setImmediate"]
      //
      // Mutant uses setTimeout(0) via fakeProcess.nextTick
      // setImmediate fires before setTimeout(0)
      // order should be: ["setImmediate", "Q"]
      expect(order).toEqual(["Q", "setImmediate"]);
      done();
    }, 100);
  });
});