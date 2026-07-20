import vm from "vm";
import fs from "fs";

describe("runSingle error handling in non-Node environment", () => {
  it("error handling schedules anonymous throw wrapper not flush rescheduling", (done) => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");

    const capturedNames: string[] = [];
    const origSetTimeout = global.setTimeout;

    function sandboxSetTimeout(fn: Function, delay: number) {
      capturedNames.push(fn.name);
      const wrapped = function(this: any) {
        try { fn.call(this); } catch(_e) {}
      };
      return origSetTimeout(wrapped as any, delay);
    }

    const sandbox: any = {
      module: { exports: {} },
      exports: {},
      setTimeout: sandboxSetTimeout,
      clearTimeout: global.clearTimeout,
      setImmediate: undefined,
      MessageChannel: undefined,
      window: undefined,
      self: undefined,
      process: undefined,
      console,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    const Q = sandbox.module.exports;
    capturedNames.length = 0;

    // Schedule the throwing task INSIDE the VM context
    vm.runInContext(`
      Q.nextTick(function throwingTask() {
        throw new Error("test error inside vm");
      });
    `, Object.assign(sandbox, { Q }));

    origSetTimeout(() => {
      const flushCount = capturedNames.filter(n => n === "flush").length;
      expect(flushCount).toBe(1);
      done();
    }, 300);
  });
});