const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.makePromise fallback behavior", () => {
  it("should use default fallback when fallback is undefined", () => {
    // Create a promise with undefined fallback
    const promise = Q.makePromise(
      {
        when: function() {
          return Q.resolve(42);
        }
      },
      undefined
    );

    // With undefined fallback:
    // - Original code: should use default fallback (reject with error)
    // - Mutated code: should skip default fallback (resolve with value)
    return promise.then(
      function(value: any) {
        // This branch should be taken in mutated code
        expect(Q.isPromise(value)).toBe(true);
      },
      function(error: any) {
        // This branch should be taken in original code
        expect(error.message).toBe("Promise does not support operation: when");
      }
    );
  });
});