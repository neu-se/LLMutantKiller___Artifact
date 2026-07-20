import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q nextTick initialization", () => {
  it("loads without error when process is not defined", () => {
    const qPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qCode = fs.readFileSync(qPath, "utf8");

    const moduleObj: { exports: any } = { exports: {} };
    const sandbox = {
      module: moduleObj,
      exports: moduleObj.exports,
      require: require,
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval,
      setImmediate: setImmediate,
      clearImmediate: clearImmediate,
      Error: Error,
      TypeError: TypeError,
      Array: Array,
      Object: Object,
      Function: Function,
      Promise: Promise,
    };

    vm.createContext(sandbox);

    let caughtError: unknown = null;
    try {
      vm.runInContext(qCode, sandbox);
    } catch (e) {
      caughtError = e;
    }

    // Original: typeof process === "object" → false (process not defined) → short-circuits safely
    // Mutant: true → evaluates process.nextTick → ReferenceError: process is not defined
    expect(caughtError).toBeNull();
    expect(typeof moduleObj.exports.defer).toBe("function");
  });
});