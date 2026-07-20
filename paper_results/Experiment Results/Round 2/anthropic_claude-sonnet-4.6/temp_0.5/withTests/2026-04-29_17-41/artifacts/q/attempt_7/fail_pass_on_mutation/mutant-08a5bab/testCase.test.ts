import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("stack jump separator should appear in long stack traces", (done) => {
    Q.longStackSupport = true;

    function level1(): Q.Promise<never> {
      const d = Q.defer<never>();
      Q.nextTick(function() {
        d.reject(new Error("deep error"));
      });
      return d.promise;
    }

    function level2(): Q.Promise<never> {
      return level1().then(null, function(e) { throw e; }) as Q.Promise<never>;
    }

    level2().then(null, function(err: Error) {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      try {
        // If makeStackTraceLong fired AND filterStackString kept content:
        // original: non-Q frames kept, separator present
        // mutation: ALL frames removed including separator line → empty
        expect(stack).toContain("From previous event:");
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});