import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error handling", () => {
  it("should not throw when rejection reason is null with long stack support enabled", () => {
    Q.longStackSupport = true;

    return Q.reject(null)
      .then(
        () => {
          Q.longStackSupport = false;
          throw new Error("Should not fulfill");
        },
        (reason) => {
          Q.longStackSupport = false;
          expect(reason).toBeNull();
        }
      );
  });
});