import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("correctly parses anonymous stack frames with multi-digit line numbers", (done) => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    
    // Extract qFileName from the promise stack
    const promiseStack: string = (d.promise as any).stack || "";
    const qFileMatch = /at defer \((.+q\.js):\d+:\d+\)/.exec(promiseStack);
    
    if (!qFileMatch) {
      Q.longStackSupport = false;
      done(new Error("Could not find q.js path in promise stack"));
      return;
    }
    
    const qFileName = qFileMatch[1];
    
    // Now craft an error with an anonymous q.js frame using the exact qFileName
    const err = new Error("test");
    err.stack = `Error: test\n    at ${qFileName}:500:5\n    at Object.<anonymous> (test.js:10:3)`;
    
    d.promise.fail((caughtErr: Error) => {
      Q.longStackSupport = false;
      const stack = caughtErr.stack || "";
      
      // With original regex (\d+): line 500 parsed, isInternalFrame=true, filtered OUT
      // With mutated regex (\d): line 500 not parsed, isInternalFrame=false, NOT filtered
      try {
        expect(stack).not.toContain(`at ${qFileName}:500:5`);
        done();
      } catch (e) {
        done(e);
      }
    });

    d.reject(err);
  });
});