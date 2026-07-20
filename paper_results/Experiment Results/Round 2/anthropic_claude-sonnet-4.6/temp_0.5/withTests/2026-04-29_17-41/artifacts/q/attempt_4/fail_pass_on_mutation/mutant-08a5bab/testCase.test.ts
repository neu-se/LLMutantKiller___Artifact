import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should not produce empty stack after long stack trace concatenation", (done) => {
    Q.longStackSupport = true;

    const err = new Error("unique-marker-xyz");

    // Chain through multiple thens to ensure makeStackTraceLong is invoked
    // makeStackTraceLong is called in _rejected when promise has .stack (set by longStackSupport)
    Q.fcall(function() {
      throw err;
    }).then(null, function(capturedErr: Error) {
      Q.longStackSupport = false;
      const stack = capturedErr.stack || "";
      try {
        // Original: filterStackString keeps non-Q frames, stack is non-empty
        // Mutation: filterStackString removes ALL frames, stack becomes ""
        expect(stack).toContain("unique-marker-xyz");
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});