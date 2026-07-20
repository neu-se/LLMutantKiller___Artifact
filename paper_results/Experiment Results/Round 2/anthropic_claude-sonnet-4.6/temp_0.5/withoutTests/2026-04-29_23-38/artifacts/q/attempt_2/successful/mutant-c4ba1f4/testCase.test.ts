import { createRequire } from "module";
import { runInNewContext } from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q setImmediate branch", () => {
  it("should use setImmediate when process.nextTick is unavailable but setImmediate is available", (done) => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    let tickCalled = false;
    const mockSetImmediate = (fn: Function) => {
      tickCalled = true;
      // Actually run it so the promise resolves
      Promise.resolve().then(() => fn());
    };

    const sandbox: any = {
      setImmediate: mockSetImmediate,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      console: console,
      module: { exports: {} },
      exports: {},
      require: require,
    };
    sandbox.module.exports = sandbox.exports;

    runInNewContext(qSource, sandbox);
    const Q = sandbox.module.exports;

    const deferred = Q.defer();
    deferred.promise.then((value: number) => {
      expect(tickCalled).toBe(true);
      expect(value).toBe(99);
      done();
    });
    deferred.resolve(99);
  });
});