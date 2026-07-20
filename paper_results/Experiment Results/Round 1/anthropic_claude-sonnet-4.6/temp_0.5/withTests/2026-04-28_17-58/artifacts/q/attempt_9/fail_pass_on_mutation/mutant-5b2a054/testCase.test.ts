import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise rejection from thrown error in fulfilled callback", () => {
  it("turns a thrown error in a then callback into a rejected promise", () => {
    const thrownError = new Error("thrown in callback");
    
    return Q(42)
      .then(function () {
        throw thrownError;
      })
      .then(
        function () {
          throw new Error("Should not have fulfilled");
        },
        function (reason: unknown) {
          expect(reason).toBe(thrownError);
        }
      );
  });
});