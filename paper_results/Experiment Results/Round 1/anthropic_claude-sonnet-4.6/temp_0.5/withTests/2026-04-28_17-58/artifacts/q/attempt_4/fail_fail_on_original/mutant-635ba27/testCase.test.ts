import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import * as path from 'path';

describe("array_indexOf fallback", () => {
  it("completes within timeout when using indexOf fallback", (done) => {
    if (!isMainThread) return;
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      const originalIndexOf = Array.prototype.indexOf;
      delete Array.prototype.indexOf;
      const Q = require(${JSON.stringify(path.resolve('../../../../../../../../../../../subject_repositories/q/q.js'))});
      Array.prototype.indexOf = originalIndexOf;
      
      Q.resetUnhandledRejections();
      Q.reject("test").fail(() => {});
      
      setTimeout(() => {
        parentPort.postMessage({ unhandledCount: Q.getUnhandledReasons().length });
      }, 200);
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    const timeout = setTimeout(() => {
      worker.terminate();
      done(new Error("Timed out - likely infinite loop in array_indexOf"));
    }, 500);
    
    worker.on('message', (msg) => {
      clearTimeout(timeout);
      expect(msg.unhandledCount).toBe(0);
      done();
    });
    
    worker.on('error', (err) => {
      clearTimeout(timeout);
      done(err);
    });
  });
});