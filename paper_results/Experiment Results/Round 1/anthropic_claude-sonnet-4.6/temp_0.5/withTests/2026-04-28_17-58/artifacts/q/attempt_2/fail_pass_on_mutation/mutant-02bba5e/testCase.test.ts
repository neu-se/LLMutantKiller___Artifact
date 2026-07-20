import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null rejection reason and long stack support", () => {
  it("should handle null rejection reason gracefully when longStackSupport is enabled", () => {
    Q.longStackSupport = true;

    return Q.reject(null)
      .then(
        () => {
          Q.longStackSupport = false;
          throw new Error("Should not have fulfilled");
        },
        (reason: unknown) => {
          Q.longStackSupport = false;
          expect(reason).toBeNull();
        }
      );
  });
});