import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null error", () => {
  it("should handle null rejection reason without throwing when long stack support is enabled", () => {
    Q.longStackSupport = true;

    return new Promise<void>((resolve, reject) => {
      Q.reject(null)
        .then(
          () => {
            Q.longStackSupport = false;
            reject(new Error("Should not have fulfilled"));
          },
          (reason) => {
            Q.longStackSupport = false;
            // In the original code, null error is handled safely
            // In the mutated code, accessing properties on null throws a TypeError
            expect(reason).toBeNull();
            resolve();
          }
        )
        .done();
    });
  });
});