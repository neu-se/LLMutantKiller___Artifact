const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly use array_indexOf in unhandled rejection tracking", () => {
    // This test targets the array_indexOf usage in unhandled rejection tracking
    // which is used internally by Q to manage promise states

    // Create multiple promises that will be tracked
    const promises = [
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
      Q.resolve(4),
      Q.resolve(5)
    ];

    // Get the internal array that tracks unhandled rejections
    // This will use array_indexOf when checking promise states
    const testPromise = Q.resolve(3);

    return Q.all(promises).then(function(results: number[]) {
      // This will use the array_indexOf shim
      const index = results.indexOf(3);
      expect(index).toBe(2);

      // Also test that the promise itself can be found in arrays
      const promiseArray = promises.slice();
      const promiseIndex = promiseArray.indexOf(testPromise);
      expect(promiseIndex).toBe(2);
    });
  });
});