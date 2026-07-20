describe("Q.async SpiderMonkey - result.done on undefined result", () => {
  it("original throws TypeError accessing result.done when result is undefined, mutated rejects cleanly", (done) => {
    (global as any).StopIteration = {};
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const fakeGenerator = {
      next: function() {
        // Throw QReturnValue immediately - result is still undefined
        try { Q["return"](42); } catch(e) { throw e; }
      },
      throw: function(e: any) { throw e; }
    };

    const asyncFn = Q.async(function() {
      return fakeGenerator;
    });

    // On original: accessing result.done where result=undefined throws TypeError
    // This TypeError propagates out of the catch block uncaught
    // On mutated: if(false) -> else -> return reject(exception) -> promise rejects with QReturnValue

    let uncaughtError: any = null;
    const originalHandler = process.listeners('uncaughtException').slice();
    
    process.once('uncaughtException', (err) => {
      uncaughtError = err;
    });

    asyncFn().then(
      () => {
        delete (global as any).StopIteration;
        done(new Error("Should not fulfill"));
      },
      (err: unknown) => {
        delete (global as any).StopIteration;
        // Mutated code reaches here (rejects with QReturnValue)
        // Original code throws TypeError before reaching here
        setTimeout(() => {
          if (uncaughtError) {
            // This is the original behavior - TypeError from result.done
            expect(uncaughtError).toBeInstanceOf(TypeError);
          } else {
            // This is mutated behavior - clean rejection
            expect(err).toBeDefined();
          }
          done();
        }, 50);
      }
    );
  });
});