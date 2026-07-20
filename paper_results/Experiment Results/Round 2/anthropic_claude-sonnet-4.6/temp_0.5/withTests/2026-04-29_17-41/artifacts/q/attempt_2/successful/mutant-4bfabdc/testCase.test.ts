import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace internal frame filtering", () => {
  it("does not include Q-internal frames in the filtered stack trace", (done) => {
    Q.longStackSupport = true;

    const d = Q.defer();

    Q.nextTick(function () {
      d.reject(new Error("boom"));
    });

    d.promise
      .then(function inner() {
        return Q.reject(new Error("boom2"));
      })
      .fail(function (err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";

        // With the original filter: !isInternalFrame && !isNodeFrame && line
        // Q's own internal frames (lines from q.js between qStartingLine and qEndingLine)
        // are excluded.
        //
        // With the mutation: !isInternalFrame || (!isNodeFrame && line)
        // Internal frames that are NOT node frames will be included
        // because !isInternalFrame is false but !isNodeFrame && line could be true,
        // however the || means if !isInternalFrame is false the whole thing is
        // determined by the right side... wait let me re-check.
        //
        // Actually: false || (true && "some line") = "some line" (truthy) -> included
        // So internal non-node frames ARE included in mutant.
        //
        // The stack should not reference Q's internal dispatch machinery
        const hasInternalQFrames = stack.split("\n").some((line: string) =>
          line.includes("promiseDispatch") ||
          line.includes("Promise.prototype.then") ||
          line.includes("runSingle") ||
          line.includes("flush")
        );

        expect(hasInternalQFrames).toBe(false);
        done();
      });
  });
});