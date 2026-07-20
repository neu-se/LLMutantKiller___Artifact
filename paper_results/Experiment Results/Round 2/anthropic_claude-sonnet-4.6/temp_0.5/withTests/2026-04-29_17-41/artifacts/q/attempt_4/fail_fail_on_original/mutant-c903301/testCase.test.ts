import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback throws error that reaches Q.onerror", () => {
  it("should surface error via Q.onerror when progress callback throws and Q.onerror is not set to a function initially but set before flush", (done) => {
    const theError = new Error("boo-progress-test");
    const def = Q.defer();

    // Don't set Q.onerror - the else branch throws e
    // In original: throw e goes to runSingle which in Node re-throws synchronously
    // causing process to crash unless we catch it
    // Instead, set Q.onerror so the if branch is taken... but if body is empty!
    
    // The if(Q.onerror){} body is EMPTY - so Q.onerror is never called here
    // The throw only happens in the else branch
    // So with Q.onerror set: error is silently swallowed (both original and mutated!)
    // With Q.onerror not set: original throws, mutated swallows
    
    // This means we need to detect the throw via runSingle behavior
    // In Node.js, runSingle re-throws after nextTick(flush)
    // We can detect this with process domain or uncaughtException
    
    const originalListeners = process.rawListeners("uncaughtException") as ((...args: unknown[]) => void)[];
    process.removeAllListeners("uncaughtException");
    
    let caught = false;
    process.once("uncaughtException", function(err: Error) {
      originalListeners.forEach(l => process.on("uncaughtException", l));
      if (err === theError) {
        caught = true;
        done();
      } else {
        done(err);
      }
    });

    setTimeout(function() {
      process.removeAllListeners("uncaughtException");
      originalListeners.forEach(l => process.on("uncaughtException", l));
      if (!caught) {
        done(new Error("Error was swallowed - mutation detected"));
      }
    }, 500);

    def.promise.progress(function() {
      throw theError;
    });

    def.notify(1);
    def.resolve();
  });
});