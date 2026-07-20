import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound check", () => {
  it("should not filter user stack frames at line numbers below qStartingLine", () => {
    Q.longStackSupport = true;

    // This function needs to be at a very low line number (< qStartingLine, ~80)
    // so that with the mutation (removing lower bound check), it gets filtered
    // but with original it doesn't
    function earlyFunction() {
      return Q.defer();
    }

    const d = earlyFunction();
    Q.nextTick(() => d.reject(new Error("test")));

    return Q().then(() => d.promise).then(
      () => { Q.longStackSupport = false; throw new Error("should reject"); },
      (err: Error) => {
        Q.longStackSupport = false;
        expect(err.stack).toContain("earlyFunction");
      }
    );
  });
});