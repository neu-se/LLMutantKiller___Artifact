import { Worker } from "worker_threads";

describe("array_indexOf fallback", () => {
  it("finds elements beyond index 0 without infinite loop", (done) => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      const originalIndexOf = Array.prototype.indexOf;
      delete Array.prototype.indexOf;
      const Q = require(${JSON.stringify(qPath)});
      Array.prototype.indexOf = originalIndexOf;
      
      Q.resetUnhandledRejections();
      // Create two rejections - p1 at index 0, p2 at index 1
      const p1 = Q.reject("first");
      const p2 = Q.reject("second");
      
      // Handle only p2 (at index 1) - requires array_indexOf to find index 1
      // With i--, this loops infinitely; with i++, it correctly returns 1
      p2.fail(() => {});
      
      // Also handle p1 to clean up
      p1.fail(() => {});
      
      // Use process.nextTick to wait for Q's async machinery
      // Q uses process.nextTick internally, so we need to wait multiple ticks
      setTimeout(() => {
        parentPort.postMessage({ count: Q.getUnhandledReasons().length });
      }, 300);
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    const timer = setTimeout(() => {
      worker.terminate();
      done(new Error("Timed out - infinite loop in array_indexOf with i--"));
    }, 600);
    
    worker.on("message", (result) => {
      clearTimeout(timer);
      expect(result.count).toBe(0);
      done();
    });
    
    worker.on("error", (e) => {
      clearTimeout(timer);
      done(e);
    });
  });
}, 3000);