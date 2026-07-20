import { readFileSync } from "fs";
import { join } from "path";
import { runInNewContext } from "vm";

describe("setImmediate branch initialization", () => {
  it("should set requestTick when setImmediate is available but process.nextTick is not", (done) => {
    const qSource = readFileSync(
      join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const results: number[] = [];

    // Simulate a non-Node environment where setImmediate exists but process doesn't
    const sandbox = {
      setImmediate: (fn: Function) => { Promise.resolve().then(() => fn()); },
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      console: console,
      exports: {} as any,
      module: { exports: {} as any },
      require: require,
      done,
      results,
    };

    try {
      runInNewContext(qSource, sandbox);
      const Q = sandbox.module.exports;

      Q.nextTick(function() {
        results.push(1);
      });

      setTimeout(() => {
        try {
          expect(results).toContain(1);
          done();
        } catch(e) {
          done(e);
        }
      }, 500);
    } catch(e) {
      done(e);
    }
  });
});