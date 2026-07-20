const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf with array length boundary condition", () => {
    // Create a test array with 3 elements
    const testArray = [1, 2, 3];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(testArray);

    // Test that indexOf doesn't access beyond array bounds
    // The mutation changes i <= this.length which would cause an out-of-bounds access
    return promise.dispatch("post", ["indexOf", [3]]).then((result: number) => {
      expect(result).toBe(2);

      // This should not throw an error in original code but might in mutated code
      // due to accessing array[3] (undefined) when i = 3 and length = 3
      return promise.dispatch("post", ["indexOf", [undefined]]).then((result2: number) => {
        // In original code, this should be -1 (not found)
        // In mutated code, this might find undefined at array[3] (out of bounds)
        expect(result2).toBe(-1);
      });
    });
  });
});