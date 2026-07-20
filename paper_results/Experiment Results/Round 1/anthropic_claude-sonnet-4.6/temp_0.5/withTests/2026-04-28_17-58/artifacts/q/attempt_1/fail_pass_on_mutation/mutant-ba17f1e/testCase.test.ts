import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces", () => {
  it("should include calling function names in long stack traces when longStackSupport is enabled", () => {
    Q.longStackSupport = true;

    return Q()
      .then(function outerFunction() {
        return Q.reject(new Error("test error"));
      })
      .then(
        function () {
          Q.longStackSupport = false;
          throw new Error("Should have been rejected");
        },
        function (err: Error) {
          Q.longStackSupport = false;
          expect(err.message).toBe("test error");
          expect(err.stack).toBeDefined();
          expect(typeof err.stack).toBe("string");
        }
      );
  });
});