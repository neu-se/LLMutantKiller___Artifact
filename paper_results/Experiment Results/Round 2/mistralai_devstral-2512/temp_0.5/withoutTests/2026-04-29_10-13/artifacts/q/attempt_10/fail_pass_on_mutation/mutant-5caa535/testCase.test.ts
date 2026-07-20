const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf with array containing undefined at end", () => {
    // Create an array with undefined at the end
    const testArray = [1, 2, 3, undefined];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(testArray);

    // Test finding the undefined value at index 3
    return promise.dispatch("post", ["indexOf", [undefined]]).then((result: number) => {
      // Should find undefined at index 3
      expect(result).toBe(3);

      // Now test with a value that doesn't exist
      return promise.dispatch("post", ["indexOf", [99]]).then((result2: number) => {
        expect(result2).toBe(-1);
      });
    });
  });
});