const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.makePromise fallback behavior", () => {
  it("should use default fallback when no fallback is provided", () => {
    const promise = Q.makePromise({
      when: function() {
        return Q.resolve(42);
      }
    });

    return promise.then(
      function(value: any) {
        expect(value).toBe(42);
      },
      function() {
        fail("Promise should not be rejected");
      }
    );
  });
});