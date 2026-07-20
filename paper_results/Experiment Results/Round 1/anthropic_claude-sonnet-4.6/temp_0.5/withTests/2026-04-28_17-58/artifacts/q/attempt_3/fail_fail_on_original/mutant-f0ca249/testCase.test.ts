import { Worker } from 'worker_threads';

describe("array_reduce fallback no-initial-value path", () => {
  it("terminates when called without initial value (does not loop infinitely)", (done) => {
    jest.setTimeout(4000);
    
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      
      // Remove native reduce to force Q's fallback
      delete Array.prototype.reduce;
      
      // Reload Q
      delete require.cache[${JSON.stringify(qPath)}];
      const Q = require(${JSON.stringify(qPath)});
      
      // Override Function.prototype.apply to strip trailing undefineds
      // when called from uncurryThis (i.e., when this === Function.prototype.call)
      const origApply = Function.prototype.apply;
      Function.prototype.apply = function(thisArg, args) {
        if (this === Function.prototype.call && Array.isArray(args)) {
          const stripped = args.slice();
          while (stripped.length > 0 && stripped[stripped.length - 1] === undefined) {
            stripped.pop();
          }
          return origApply.call(this, thisArg, stripped);
        }
        return origApply.call(this, thisArg, args);
      };
      
      // Now Q.all will call array_reduce(promises, callback, void 0)
      // → uncurryThis strips void 0 → fallback.call(promises, callback) → args.length === 1
      // Original: throws TypeError → Q rejects → we receive 'rejected'
      // Mutated: infinite loop → Worker hangs → main thread kills it
      
      Q.all([Q(1)]).then(
        function() { parentPort.postMessage('resolved'); },
        function(err) { parentPort.postMessage('rejected: ' + err.constructor.name); }
      );
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    
    const killTimeout = setTimeout(() => {
      worker.terminate();
      done(new Error('Worker timed out - infinite loop in mutated code'));
    }, 2500);
    
    worker.on('message', (msg) => {
      clearTimeout(killTimeout);
      worker.terminate();
      // Original code terminates (rejects with TypeError)
      expect(msg).toMatch(/rejected/);
      done();
    });
    
    worker.on('error', (err) => {
      clearTimeout(killTimeout);
      worker.terminate();
      // Error is also a form of termination - original code
      done();
    });
  });
});