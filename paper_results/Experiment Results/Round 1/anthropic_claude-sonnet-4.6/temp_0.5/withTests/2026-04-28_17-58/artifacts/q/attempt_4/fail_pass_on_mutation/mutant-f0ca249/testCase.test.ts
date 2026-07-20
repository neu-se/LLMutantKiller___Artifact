import { Worker } from 'worker_threads';

describe("Q array_reduce fallback no-initial-value path", () => {
  it("terminates (throws TypeError) rather than looping infinitely when called without initial value", (done) => {
    jest.setTimeout(4000);
    
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const workerCode = `
      const { parentPort } = require('worker_threads');
      
      // Remove native reduce to force Q to use its fallback
      delete Array.prototype.reduce;
      delete require.cache[${JSON.stringify(qPath)}];
      const Q = require(${JSON.stringify(qPath)});
      
      // Override Function.prototype.call to strip trailing undefined args.
      // Q's uncurryThis does: call.apply(f, arguments) where call = Function.call.
      // When array_reduce(arr, cb, void 0) is called, this becomes:
      //   Function.call.apply(fallback, [arr, cb, void 0])
      // which calls our override with this=fallback, thisArg=arr, extra=[cb, void 0].
      // We strip the trailing void 0, so fallback.call(arr, cb) is called,
      // triggering arguments.length === 1 in the fallback.
      const origCall = Function.prototype.call;
      Function.prototype.call = function(thisArg) {
        const args = origCall.apply(Array.prototype.slice, [arguments, 1]);
        while (args.length > 0 && args[args.length - 1] === undefined) args.pop();
        return origCall.apply(this, [thisArg].concat(args));
      };
      
      // Q.all triggers array_reduce(promises, callback, void 0).
      // With override: void 0 stripped → fallback.call(arr, cb) → arguments.length === 1.
      // Original (++index): throws TypeError → Q rejects → Worker sends 'done'.
      // Mutated (--index): infinite loop → Worker hangs → main thread times out.
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
        done(new Error('Timed out: infinite loop detected (mutated code)'));
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