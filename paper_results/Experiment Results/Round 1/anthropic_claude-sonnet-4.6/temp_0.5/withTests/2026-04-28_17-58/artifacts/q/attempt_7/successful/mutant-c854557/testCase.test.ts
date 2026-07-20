import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("correctly parses anonymous stack frames with multi-digit line numbers", (done) => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    const promiseStack: string = (d.promise as any).stack || "";
    
    // Try multiple patterns to find q.js path in the stack
    const qFileMatch = 
      /\((.+[\/\\]q\.js):\d+:\d+\)/.exec(promiseStack) ||
      /at (.+[\/\\]q\.js):\d+:\d+/.exec(promiseStack);
    
    if (!qFileMatch) {
      Q.longStackSupport = false;
      // Log what we got for debugging
      done(new Error("Could not find q.js path. Stack was: " + promiseStack));
      return;
    }
    
    const qFileName = qFileMatch[1];
    const err = new Error("test");
    err.stack = `Error: test\n    at ${qFileName}:500:5\n    at Object.<anonymous> (test.js:10:3)`;
    
    d.promise.fail((caughtErr: Error) => {
      Q.longStackSupport = false;
      const stack = caughtErr.stack || "";
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