import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("filterStackString should not remove the error header line which has no file/line info", (done) => {
    Q.longStackSupport = true;

    // p1 is a deferred promise - it gets a .stack property because longStackSupport=true
    const d1 = Q.defer();
    // p2 chains off p1 - also gets .stack
    const p2 = d1.promise.then(null, function(e: Error) {
      // re-reject to trigger makeStackTraceLong on p2 which has .stack
      throw e;
    });

    p2.then(null, function(capturedErr: Error) {
      Q.longStackSupport = false;
      const stack = capturedErr.stack || "";
      try {
        // With original: "Error: ..." line has no file/line, isInternalFrame=false, kept
        // With mutation: isInternalFrame=true for ALL lines including "Error: ...", stack=""
        expect(stack.length).toBeGreaterThan(0);
        done();
      } catch(e2) {
        done(e2);
      }
    });

    d1.reject(new Error("test error for stack"));
  });
});