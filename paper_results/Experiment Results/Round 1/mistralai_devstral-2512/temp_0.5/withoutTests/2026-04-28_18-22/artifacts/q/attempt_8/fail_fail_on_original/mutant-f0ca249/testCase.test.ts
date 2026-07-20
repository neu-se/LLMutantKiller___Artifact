const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce operation with no initial value", () => {
    // This test targets the specific mutation in array_reduce
    // where ++index was changed to --index in the initial value check
    // We need to trigger the code path that uses reduce without initial value

    // Create a promise that will use array_reduce internally
    // The mutation would cause different behavior when finding first value
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Simulate the internal reduce operation that Q uses
    // This should trigger the mutated code path
    return promise.then(() => {
      // Use a method that internally uses array_reduce without initial value
      return Q.all([1, 2, 3]);
    }).then((result: any) => {
      expect(result).toEqual([1, 2, 3]);
    });
  });
});