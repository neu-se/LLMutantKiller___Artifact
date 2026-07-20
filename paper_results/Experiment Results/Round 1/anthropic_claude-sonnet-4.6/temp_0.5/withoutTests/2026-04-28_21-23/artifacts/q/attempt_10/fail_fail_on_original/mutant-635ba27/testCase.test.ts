import { Worker, isMainThread, parentPort } from "worker_threads";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

describe("array_indexOf fallback shim", () => {
  it("should complete without infinite loop when using indexOf fallback", (done) => {
    if (!isMainThread) return done();

    const workerCode = `
      const { parentPort } = require('worker_threads');
      
      const originalIndexOf = Array.prototype.indexOf;
      delete Array.prototype.indexOf;
      
      const modulePath = require.resolve(${JSON.stringify(require.resolve("../../../../../../../../../../../subject_repositories/q/q.js"))});
      delete require.cache[modulePath];
      const QFresh = require(modulePath);
      
      Array.prototype.indexOf = originalIndexOf;
      
      QFresh.resetUnhandledRejections();
      QFresh.reject(new Error("test"));
      
      QFresh.when(QFresh(1), function(val) {
        parentPort.postMessage({ success: true, val: val });
      });
      
      setTimeout(function() {
        parentPort.postMessage({ success: false, reason: 'timeout' });
      }, 1000);
    `;

    const tmpFile = path.join(os.tmpdir(), `q_test_worker_${Date.now()}.js`);
    fs.writeFileSync(tmpFile, workerCode);

    const worker = new Worker(tmpFile);
    
    worker.on("message", (msg) => {
      fs.unlinkSync(tmpFile);
      if (msg.success) {
        expect(msg.val).toBe(1);
        done();
      } else {
        done(new Error("Worker timed out - possible infinite loop"));
      }
    });

    worker.on("error", (err) => {
      try { fs.unlinkSync(tmpFile); } catch(e) {}
      done(err);
    });
  });
});