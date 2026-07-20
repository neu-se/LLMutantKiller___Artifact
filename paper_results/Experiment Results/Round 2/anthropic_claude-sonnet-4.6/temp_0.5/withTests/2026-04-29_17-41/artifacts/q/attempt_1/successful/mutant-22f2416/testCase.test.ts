import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("resolves with a single value (not an array) when callback is called with exactly two arguments", async () => {
    const deferred = Q.defer();
    const callback = deferred.makeNodeResolver();

    // Call with exactly 2 arguments: null error + single value
    callback(null, 42);

    const result = await deferred.promise;
    // With original code (arguments.length > 2): resolves with 42 (not an array)
    // With mutated code (arguments.length >= 2): resolves with [42] (an array)
    expect(result).toBe(42);
  });
});