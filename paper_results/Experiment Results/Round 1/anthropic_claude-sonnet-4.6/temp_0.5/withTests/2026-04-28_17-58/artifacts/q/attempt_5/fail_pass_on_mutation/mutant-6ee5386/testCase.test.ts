import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally throwing callback", () => {
  it("should reject with callback exception when callback throws during rejection handling", () => {
    const originalError = new Error("original");
    const callbackError = new Error("from callback");
    
    return Q.reject(originalError)
      ["finally"](function() {
        throw callbackError;
      })
      .then(
        function() {
          // Should not reach here
          expect(true).toBe(false);
        },
        function(reason: any) {
          // Should be the callback error, not original
          expect(reason).toBe(callbackError);
        }
      );
  });
});