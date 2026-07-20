import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap behavior", () => {
  it("does not call tap callback when promise is rejected", () => {
    const error = new Error("rejected");
    let callbackCalled = false;

    return Q.reject(error)
      .tap(function() {
        callbackCalled = true;
      })
      .then(
        function() {
          throw new Error("should not fulfill");
        },
        function(reason: any) {
          expect(callbackCalled).toBe(false);
          expect(reason).toBe(error);
        }
      );
  });
});