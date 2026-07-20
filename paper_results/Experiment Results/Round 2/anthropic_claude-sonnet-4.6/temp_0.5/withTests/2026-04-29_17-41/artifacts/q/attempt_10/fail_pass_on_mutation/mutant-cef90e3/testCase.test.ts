import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("should resolve with rejection handler result, not call both handlers", () => {
    const error = new Error("original error");
    const recovered = "recovered value";
    
    // rejected promise with a rejection handler that recovers
    return Q.reject(error).then(
      function() {
        throw new Error("fulfilled should not be called");
      },
      function(reason: unknown) {
        expect(reason).toBe(error);
        return recovered;
      }
    ).then(
      function(value: unknown) {
        expect(value).toBe(recovered);
      },
      function(reason: unknown) {
        throw new Error("Should have fulfilled with recovered value, got rejection: " + reason);
      }
    );
  });
});