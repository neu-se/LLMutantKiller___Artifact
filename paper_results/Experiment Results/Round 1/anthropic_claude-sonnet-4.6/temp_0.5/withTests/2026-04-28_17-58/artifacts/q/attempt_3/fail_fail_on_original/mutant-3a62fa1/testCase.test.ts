import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick process detection", () => {
  it("uses setImmediate (not process.nextTick) when process is typeof function", (done) => {
    jest.resetModules();

    const savedProcess = (global as any).process;
    const realNextTick = savedProcess.nextTick.bind(savedProcess);

    // Make process a function: typeof === "function" (not "object")
    // Give it a nextTick that uses the real process.nextTick (fires before setImmediate)
    const fakeProcess: any = function () {};
    fakeProcess.nextTick = realNextTick;
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

    loadedQ.nextTick(() => {
      order.push("Q");
    });

    setImmediate(() => {
      order.push("setImmediate");
    });

    setTimeout(() => {
      // Original: typeof fakeProcess === "function" !== "object"
      //   → skips Node branch → uses setImmediate
      //   Both Q and test setImmediate registered → Q registered first → ["Q", "setImmediate"]
      //   Wait, but previous test showed ["setImmediate", "Q"] for original...
      //   
      // Mutant: true → remaining conditions pass → uses fakeProcess.nextTick (real process.nextTick)
      //   process.nextTick fires before setImmediate → ["Q", "setImmediate"]
      //
      // So: original → ["setImmediate", "Q"], mutant → ["Q", "setImmediate"]
      expect(order).toEqual(["setImmediate", "Q"]);
      done();
    }, 100);
  });
});