const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.makePromise fallback behavior", () => {
  it("should trigger default fallback when fallback is undefined", () => {
    const promise = Q.makePromise(
      {
        when: function() {
          return Q.resolve(42);
        }
      },
      undefined
    );

    return promise.then(
      function(value: any) {
        // With undefined fallback in original code, should use default fallback
        // which rejects with "Promise does not support operation: when"
        throw new Error("Promise should be rejected with default fallback");
      },
      function(error: any) {
        expect(error.message).toBe("Promise does not support operation: when");
      }
    );
  });
});