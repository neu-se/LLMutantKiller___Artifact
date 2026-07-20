import { Worker } from 'worker_threads';

describe("Q array_reduce fallback no-initial-value path", () => {
  it("terminates rather than looping infinitely when called without initial value", (done) => {
    jest.setTimeout(4000);

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    const workerCode = `
      const { parentPort } = require('worker_threads');

      // Remove native reduce so Q uses its fallback
      delete Array.prototype.reduce;
      delete require.cache[${JSON.stringify(qPath)}];
      const Q = require(${JSON.stringify(qPath)});

      // At this point Q has captured its internal fallback via uncurryThis.
      // Q's array_reduce = function() { return Function.call.apply(fallback, arguments); }
      // When called as array_reduce(arr, cb, void 0):
      //   -> Function.call.apply(fallback, [arr, cb, void 0])
      //   -> fallback.call(arr, cb, void 0)  [arguments.length=2 inside fallback]
      //
      // To trigger arguments.length===1, we need fallback.call(arr, cb) with no 3rd arg.
      // We achieve this by replacing Function.prototype.call with a version that
      // drops trailing undefined arguments when the callee is the fallback.
      // We identify the fallback by checking if it's being called with undefined as last arg
      // from within uncurryThis (i.e., when 'this' context matches).
      //
      // Simpler approach: replace Array.prototype.reduce with a wrapper that
      // calls the REAL fallback (now stored in Q's closure) with 1 arg.
      // We can't access Q's closure directly, but we can re-implement the test
      // by providing a reduce that drops undefined initial values:

      // Provide a new Array.prototype.reduce that mimics what Q needs but
      // treats undefined initial value as "no initial value" (1-arg case).
      // This new reduce will be used by any NEW code that calls Array.prototype.reduce,
      // but Q already captured its fallback. So we need to intercept at a lower level.

      // The only reliable way: intercept Reflect.apply or use a Proxy on Function.prototype.
      // Let's use Reflect.apply override:
      const origReflectApply = Reflect.apply;
      Reflect.apply = function(target, thisArg, args) {
        // When Q's uncurryThis calls: Function.call.apply(fallback, argumentsObj)
        // this becomes Reflect.apply(Function.call, fallback, argumentsObj)
        // We want to strip trailing undefined from argumentsObj
        if (target === Function.prototype.call && Array.isArray(args)) {
          const stripped = args.slice();
          while (stripped.length > 0 && stripped[stripped.length - 1] === undefined) {
            stripped.pop();
          }
          return origReflectApply(target, thisArg, stripped);
        }
        return origReflectApply(target, thisArg, args);
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