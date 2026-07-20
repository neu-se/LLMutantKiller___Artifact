import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should preserve user code stack frames and not filter them as Q-internal frames", () => {
    Q.longStackSupport = true;

    function myUniqueFunction() {
      return Q.reject(new Error("test rejection"));
    }

    return myUniqueFunction()
      .catch((err: Error) => {
        Q.longStackSupport = false;
        expect(err.stack).toContain("myUniqueFunction");
      });
  });
});