const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle array reduce with no initial value on empty array", () => {
    // This test directly targets the array_reduce mutation
    // The mutation changes ++index to --index which would cause incorrect bounds checking
    // when reduce is called without initial value on empty arrays

    // Create a promise that will use array_reduce internally
    const promise = Q([]).then((arr: any[]) => {
      // This will trigger the array_reduce code path without initial value
      return Q.all(arr.map((item: any) => Q.resolve(item)));
    });

    return promise.then(
      (result: any[]) => {
        // Original code should complete successfully with empty array
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      },
      (error: any) => {
        // Mutated code might throw TypeError due to incorrect index handling
        throw error;
      }
    );
  });
});