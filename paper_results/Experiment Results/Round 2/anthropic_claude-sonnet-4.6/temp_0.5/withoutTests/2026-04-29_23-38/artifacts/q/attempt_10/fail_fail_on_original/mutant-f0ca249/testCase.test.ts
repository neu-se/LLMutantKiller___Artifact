import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import * as path from "path";

describe("Q", () => {
  it("array_reduce fallback should not infinite loop", (done) => {
    if (!isMainThread) return done();
    
    const worker = new Worker(`
      const { parentPort } = require('worker_threads');
      const origReduce = Array.prototype.reduce;
      delete Array.prototype.reduce;
      // clear cache
      Object.keys(require.cache).forEach(k => { if (k.includes('q.js')) delete require.cache[k]; });
      const Q = require('${path.resolve("subject_repositories/q/q.js")}');
      Array.prototype.reduce = origReduce;
      // trigger array_reduce
      Q.all([Q(1)]).then(r => { parentPort.postMessage({result: r}); });
    `, { eval: true });
    
    const timeout = setTimeout(() => {
      worker.terminate();
      done(new Error("infinite loop detected"));
    }, 2000);
    
    worker.on("message", (msg) => {
      clearTimeout(timeout);
      expect(msg.result).toEqual([1]);
      done();
    });
  });
});