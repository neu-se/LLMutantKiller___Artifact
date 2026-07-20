import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q setImmediate branch", () => {
  it("should resolve promises when using setImmediate for scheduling (window defined)", (done) => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const results: number[] = [];
    const mockWindow = { Q: undefined as any };

    const sandbox = {
      window: mockWindow,
      self: mockWindow,
      setImmediate: setImmediate,
      clearImmediate: clearImmediate,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      MessageChannel: undefined as any,
      process: {
        // Make process not look like real Node process so setImmediate branch is used
        toString: () => "[object Object]",
        nextTick: undefined as any,
        domain: undefined,
        env: {},
        emit: undefined as any,
      },
      console: console,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    const Q = (sandbox as any).window.Q;

    const deferred = Q.defer();
    deferred.resolve(42);
    deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      done();
    });
  });
});