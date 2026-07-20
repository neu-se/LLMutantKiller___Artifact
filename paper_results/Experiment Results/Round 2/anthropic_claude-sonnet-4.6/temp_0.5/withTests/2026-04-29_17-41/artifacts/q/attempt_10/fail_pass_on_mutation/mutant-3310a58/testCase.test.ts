import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q longStackSupport initialization", () => {
  it("should not set longStackSupport when process is a function type with Q_DEBUG set", () => {
    const qFilePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qSource = fs.readFileSync(qFilePath, "utf8");

    const fakeProcess: any = function fakeProc() {};
    fakeProcess.env = { Q_DEBUG: "1" };
    fakeProcess.nextTick = (fn: Function) => { fn(); };
    fakeProcess.toString = () => "[object process]";
    fakeProcess.domain = undefined;

    const moduleObj = { exports: {} as any };

    const sandbox: any = {
      process: fakeProcess,
      setTimeout,
      setImmediate,
      clearTimeout,
      clearImmediate,
      console,
      module: moduleObj,
      exports: moduleObj.exports,
      require: require,
      __filename: qFilePath,
      __dirname: path.dirname(qFilePath),
    };

    vm.createContext(sandbox);

    // Wrap in a function that sets module.exports properly
    const wrappedSource = `(function(module, exports, require, __filename, __dirname) { ${qSource} })(module, exports, require, __filename, __dirname);`;
    vm.runInContext(wrappedSource, sandbox);

    const Q = moduleObj.exports;

    // Original: typeof fakeProcess === "function" !== "object" → condition false → longStackSupport = false
    // Mutated: true && fakeProcess.env && fakeProcess.env.Q_DEBUG → condition true → longStackSupport = true
    expect(Q.longStackSupport).toBe(false);
  });
});