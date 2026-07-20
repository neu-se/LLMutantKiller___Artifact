import { Worker } from "worker_threads";

describe("array_indexOf fallback loop direction", () => {
  it("does not infinite loop when native indexOf is absent", (done) => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      try {
        const originalIndexOf = Array.prototype.indexOf;
        delete Array.prototype.indexOf;
        const Q = require(${JSON.stringify(qPath)});
        Array.prototype.indexOf = originalIndexOf;
        Q.resetUnhandledRejections();
        Q.reject("test").fail(() => {});
        setTimeout(() => {
          parentPort.postMessage({ success: true, count: Q.getUnhandledReasons().length });
        }, 200);
      } catch(e) {
        parentPort.postMessage({ success: false, error: e.message });
      }
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    const timer = setTimeout(() => {
      worker.terminate();
      done(new Error("Worker timed out - infinite loop detected in array_indexOf"));
    }, 500);
    
    worker.on("message", (result) => {
      clearTimeout(timer);
      expect(result.success).toBe(true);
      expect(result.count).toBe(0);
      done();
    });
    
    worker.on("error", (e) => {
      clearTimeout(timer);
      done(e);
    });
  });
}, 3000);