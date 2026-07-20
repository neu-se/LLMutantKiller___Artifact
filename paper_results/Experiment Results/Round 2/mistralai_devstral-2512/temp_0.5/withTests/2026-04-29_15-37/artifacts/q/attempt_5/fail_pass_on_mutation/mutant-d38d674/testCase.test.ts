const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.makePromise fallback behavior", () => {
  it("should use default fallback when fallback is undefined", () => {
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
        // With undefined fallback, should use default behavior and return the promise itself
        expect(Q.isPromise(value)).toBe(true);
      },
      function() {
        fail("Promise should not be rejected");
      }
    );
  });
});