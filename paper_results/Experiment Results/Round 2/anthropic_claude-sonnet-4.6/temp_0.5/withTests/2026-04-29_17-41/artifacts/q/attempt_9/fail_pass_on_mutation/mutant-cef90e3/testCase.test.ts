import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then", () => {
  it("should not invoke rejection callback when fulfillment callback already ran", () => {
    const d = Q.defer();
    let rejectionCallCount = 0;

    const result = d.promise.then(
      function(value: unknown) {
        return value;
      },
      function(reason: unknown) {
        rejectionCallCount++;
        return Q.reject(reason);
      }
    );

    // Resolve with a thenable that also triggers rejection path
    d.resolve(42);

    // Also reject after resolve (should be ignored by deferred, but
    // the then's rejection callback should never have been called)
    d.reject(new Error("late rejection"));

    return result.then(
      function(value: unknown) {
        expect(rejectionCallCount).toBe(0);
        expect(value).toBe(42);
      },
      function() {
        throw new Error("result should be fulfilled");
      }
    );
  });
});