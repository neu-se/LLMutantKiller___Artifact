import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound", () => {
  it("stack frames from promise creation site should appear in long stack traces", (done) => {
    Q.longStackSupport = true;
    
    // Create deferred at a known early line
    const d = Q.defer();
    
    d.promise.then(null, function onRejected(err: Error) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // The stack should contain "From previous event:" showing makeStackTraceLong ran
      if (stack.indexOf("From previous event:") === -1) {
        // makeStackTraceLong didn't run, can't test
        done();
        return;
      }
      // After "From previous event:", we should see the promise creation frames
      // These include the line where Q.defer() was called in this test file
      // With original: low line numbers are NOT filtered (line < qStartingLine)
      // With mutated: low line numbers ARE filtered (line <= qEndingLine)
      const afterSeparator = stack.split("From previous event:")[1] || "";
      expect(afterSeparator).toContain("testCase.test.ts");
      done();
    });
    
    d.reject(new Error("test rejection"));
  });
});