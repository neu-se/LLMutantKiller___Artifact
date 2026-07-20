import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("resolves with a single value (not an array) when callback is called with exactly one success argument", (done) => {
    const deferred = (Q as any).defer();
    const callback = deferred.makeNodeResolver();

    // Call with null error and exactly one value argument (total arguments.length === 2)
    callback(null, 42);

    deferred.promise.then(
      (value: any) => {
        // Original code: arguments.length > 2 is false, so resolves with value (42)
        // Mutated code: arguments.length >= 2 is true, so resolves with [42]
        expect(value).toBe(42);
        done();
      },
      (err: any) => {
        done(new Error("Promise was rejected unexpectedly: " + err));
      }
    );
  });
});