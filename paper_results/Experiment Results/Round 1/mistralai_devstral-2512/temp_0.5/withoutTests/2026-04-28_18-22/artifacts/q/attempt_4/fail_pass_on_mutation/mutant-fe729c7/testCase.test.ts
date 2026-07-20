const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce mutation", () => {
  it("should correctly handle sparse arrays in reduce operations", () => {
    // Create a sparse array with some missing indices
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // index 3 is missing

    // Test the internal array_reduce function directly by creating a promise
    // that will use it in its resolution
    const deferred = Q.defer();

    // Use the internal array_reduce through a promise operation
    Q.when(sparseArray, function(array) {
      // Manually invoke the reduce operation that would be used internally
      const result = Q(array).then(function(arr) {
        // Use spread to get all values and sum them
        return Q.all(arr).then(function(values) {
          // Filter out undefined values (from sparse array)
          return values.filter(v => v !== undefined).reduce((sum, val) => sum + val, 0);
        });
      });

      deferred.resolve(result);
    });

    return deferred.promise.then((result: number) => {
      // Original code: should sum 1 + 3 + 5 = 9 (skipping missing indices)
      // Mutated code: will include undefined values in the reduction
      expect(result).toBe(9);
    });
  });
});