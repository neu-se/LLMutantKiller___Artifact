import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("detects mutation by checking stack frame from test file is preserved", (done) => {
    Q.longStackSupport = true;

    const d = Q.defer();

    // This function name should appear in stack traces
    function rejectFromHere() {
      d.reject(new Error("test"));
    }

    d.promise.then(null, function(err: Error) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      try {
        // Original: frames from THIS file (not q.js) pass isInternalFrame=false, kept
        // Mutation: isInternalFrame=true for ALL frames, all removed → stack=""
        // The test file name should appear in original but not mutation
        expect(stack).toContain("rejectFromHere");
        done();
      } catch(e) {
        done(e);
      }
    });

    rejectFromHere();
  });
});