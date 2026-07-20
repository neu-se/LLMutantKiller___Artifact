import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named frame parsing", () => {
  it("should correctly parse named function frames to enable Q internal frame filtering", (done) => {
    // Enable long stack support BEFORE creating any promises
    Q.longStackSupport = true;

    // Create a deferred - this sets promise.stack to include Q internal frames
    const deferred = Q.defer<void>();
    
    // This .then() call creates another deferred internally (also with .stack set)
    // When this promise rejects, makeStackTraceLong will be called
    deferred.promise
      .then(function throwingStep() {
        // Throw to trigger rejection path
        throw new Error("deliberate error for stack test");
      })
      .fail(function catchStep(e: any) {
        Q.longStackSupport = false;
        
        const stack: string = e.stack || "";
        
        // The promise.stack (set in defer()) contains frames like:
        //   at defer (/path/to/q.js:450:5)
        //   at Promise.prototype.then (/path/to/q.js:700:5)
        // 
        // With ORIGINAL code:
        //   - getFileNameAndLineNumber correctly parses these named frames
        //   - isInternalFrame returns true for them
        //   - filterStackString removes them
        //   - error.stack does NOT contain q.js frames
        //
        // With MUTATED code:
        //   - getFileNameAndLineNumber returns [] for named frames (if(false))
        //   - isInternalFrame returns false for them (undefined >= undefined is false)
        //   - filterStackString keeps them
        //   - error.stack DOES contain q.js frames
        
        const stackLines = stack.split("\n");
        const qInternalLines = stackLines.filter((line: string) => 
          /q\.js:\d+/.test(line)
        );
        
        try {
          // Original: no q.js frames in stack (they're filtered)
          // Mutated: q.js frames present in stack (not filtered)
          expect(qInternalLines).toHaveLength(0);
          done();
        } catch (testError) {
          done(testError);
        }
      });
    
    // Trigger the chain
    deferred.resolve();
  });
});