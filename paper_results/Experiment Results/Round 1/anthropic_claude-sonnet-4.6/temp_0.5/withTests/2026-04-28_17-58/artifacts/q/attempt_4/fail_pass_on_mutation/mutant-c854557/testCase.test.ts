import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("filters Q internal function frames from long stack traces", (done) => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    
    deferred.promise
      .then(function userStep() {
        return Q.reject(new Error("test error"));
      })
      .fail(function userErrorHandler(err: Error) {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        const lines = stack.split("\n");
        
        // If qStartingLine/qEndingLine are correctly set (requires parsing multi-digit line numbers),
        // then Q's internal frames are filtered out.
        // If they're undefined (mutation causes parsing failure), Q's frames remain.
        
        // Check that none of the remaining frames are from Q's internal functions
        // These are the Q internal function names that would appear if filtering fails
        const qInternalNames = [
            "Promise.prototype.then",
            "Promise.prototype.dispatch", 
            "runSingle",
            "flush",
            "defer",
        ];
        
        const hasQInternals = lines.some(line =>
          qInternalNames.some(name => line.includes(name) && line.includes("q.js"))
        );
        
        try {
          expect(hasQInternals).toBe(false);
          done();
        } catch (e) {
          done(e);
        }
      });

    deferred.resolve();
  });
});