import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.then progress handler error handling", () => {
  it("should handle errors in progress propagation correctly", async () => {
    const deferred = Q.defer();
    const progressError = new Error("progress error");
    let resolvedValue: unknown = "NOT_RESOLVED";
    let rejectedError: unknown = null;

    // Chain: deferred.promise -> then (with progress handler that throws) -> tap
    const promise = deferred.promise
      .then(
        (v: unknown) => v,
        null,
        function() { throw progressError; }
      );

    deferred.notify("progress");
    deferred.resolve(42);

    await promise.then(
      (val: unknown) => { resolvedValue = val; },
      (err: unknown) => { rejectedError = err; }
    );

    // With threw=true (original): error is tracked, promise resolves normally
    // With threw=false (mutated): error tracking fails, different behavior
    expect(resolvedValue).toBe(42);
    expect(rejectedError).toBeNull();
  });
});