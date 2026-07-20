import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q longStackSupport initialization", () => {
  it("should not set longStackSupport when process is a function (not object type) even with Q_DEBUG set", () => {
    const qFilePath = path.resolve(__dirname, "../../../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qFilePath, "utf8");

    // Create a fake process that is a function (typeof === "function", not "object")
    // but has env.Q_DEBUG set
    const fakeProcess: any = function fakeProc() {};
    fakeProcess.env = { Q_DEBUG: "1" };
    fakeProcess.nextTick = (fn: Function) => setImmediate(fn);
    fakeProcess.toString = () => "[object process]";
    fakeProcess.domain = undefined;

    const sandbox: any = {
      process: fakeProcess,
      setTimeout,
      setImmediate,
      clearTimeout,
      console,
      module: { exports: {} },
      exports: {},
      require: (id: string) => require(id),
    };
    sandbox.module.exports = sandbox.exports;

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    const Q = sandbox.module.exports;

    // Original: typeof fakeProcess === "function" !== "object" → false → longStackSupport stays false
    // Mutated: true && fakeProcess.env && fakeProcess.env.Q_DEBUG → true → longStackSupport = true
    expect(Q.longStackSupport).toBe(false);
  });
});