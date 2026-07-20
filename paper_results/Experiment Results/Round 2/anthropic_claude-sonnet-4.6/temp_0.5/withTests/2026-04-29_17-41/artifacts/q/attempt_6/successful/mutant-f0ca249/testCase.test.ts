import * as vm from "vm";
import * as fs from "fs";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

describe("Q array_reduce polyfill", () => {
  it("throws TypeError for empty array without initial value (not infinite loop)", (done) => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");

    const patchedSource = qSource.replace(
      "var array_indexOf = uncurryThis(",
      [
        "Q._reduceTest = (function() {",
        "  try { array_reduce([], function(){}); return 'no-throw'; }",
        "  catch(e) { return e instanceof TypeError ? 'type-error' : 'other'; }",
        "})();",
        "var array_indexOf = uncurryThis("
      ].join("\n")
    );

    const workerCode = `
      const { parentPort } = require('worker_threads');
      const vm = require('vm');
      
      const patchedSource = ${JSON.stringify(patchedSource)};
      
      try {
        const result = vm.runInNewContext(
          "(function() {" +
          "  delete Array.prototype.reduce;" +
          "  var module = { exports: {} };" +
          "  var exports = module.exports;" +
          "  " + patchedSource +
          "  return module.exports._reduceTest;" +
          "})()",
          { process, setTimeout, clearTimeout, setImmediate, console }
        );
        parentPort.postMessage({ result });
      } catch(e) {
        parentPort.postMessage({ error: e.message });
      }
    `;

    const worker = new Worker(workerCode, { eval: true });
    
    const timeout = setTimeout(() => {
      worker.terminate();
      done(new Error("Timed out - likely infinite loop from mutation"));
    }, 2000);

    worker.on("message", (msg) => {
      clearTimeout(timeout);
      if (msg.error) {
        done(new Error(msg.error));
      } else {
        try {
          expect(msg.result).toBe("type-error");
          done();
        } catch(e) {
          done(e);
        }
      }
    });

    worker.on("error", (err) => {
      clearTimeout(timeout);
      done(err);
    });
  }, 5000);
});