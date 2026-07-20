import { Worker } from 'worker_threads';

describe("Q array_reduce fallback", () => {
  it("no-initial-value path terminates with TypeError not infinite loop", (done) => {
    jest.setTimeout(4000);
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      
      delete Array.prototype.reduce;
      delete require.cache[${JSON.stringify(qPath)}];
      const Q = require(${JSON.stringify(qPath)});
      
      // Q's uncurryThis: function() { return call.apply(f, arguments); }
      // call = Function.prototype.call (captured at load time)
      // array_reduce(arr, cb, void 0) -> call.apply(fallback, [arr, cb, void 0])
      // -> Function.prototype.call.apply(fallback, arguments_obj_with_3_items)
      // Our override intercepts this and strips trailing undefined
      
      const origApply = Function.prototype.apply;
      Function.prototype.apply = function(thisArg, argsObj) {
        if (this === Function.prototype.call && argsObj != null) {
          // Convert to real array
          const len = argsObj.length >>> 0;
          const arr = new Array(len);
          for (let i = 0; i < len; i++) arr[i] = argsObj[i];
          // Strip trailing undefineds
          let newLen = len;
          while (newLen > 0 && arr[newLen - 1] === undefined) newLen--;
          arr.length = newLen;
          return origApply.call(this, thisArg, arr);
        }
        return origApply.call(this, thisArg, argsObj);
      };
      
      Q.all([Q(1)]).then(
        function() { parentPort.postMessage('done'); },
        function() { parentPort.postMessage('done'); }
      );
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    let finished = false;
    
    const killTimeout = setTimeout(() => {
      if (!finished) {
        finished = true;
        worker.terminate();
        done(new Error('Timed out: infinite loop (mutated code)'));
      }
    }, 2500);
    
    function complete() {
      if (!finished) {
        finished = true;
        clearTimeout(killTimeout);
        worker.terminate();
        done();
      }
    }
    
    worker.on('message', complete);
    worker.on('error', complete);
    worker.on('exit', (code) => { if (code !== 0) complete(); });
  });
});