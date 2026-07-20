const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf with array containing undefined values", () => {
    // Create an array with explicit undefined values
    const arrayWithUndefined = [1, undefined, 3];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(arrayWithUndefined);

    // Test finding the undefined value at index 1
    return promise.dispatch("post", ["indexOf", [undefined]]).then((result: number) => {
      // Should find undefined at index 1
      expect(result).toBe(1);

      // Now test with a value that doesn't exist
      return promise.dispatch("post", ["indexOf", [99]]).then((result2: number) => {
        expect(result2).toBe(-1);
      });
    });
  });
});