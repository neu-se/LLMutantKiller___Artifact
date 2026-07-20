const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf with sparse array", () => {
    // Create a sparse array with holes
    const sparseArray = [1, , 3]; // index 1 is empty

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(sparseArray);

    // Test finding element at index 2 (value 3)
    return promise.dispatch("post", ["indexOf", [3]]).then((result: number) => {
      expect(result).toBe(2);

      // Test finding undefined (should not match empty slots in sparse array)
      return promise.dispatch("post", ["indexOf", [undefined]]).then((result2: number) => {
        // In original code: should be -1 (empty slots are not undefined)
        // In mutated code: might incorrectly find at index 3 (out of bounds)
        expect(result2).toBe(-1);
      });
    });
  });
});