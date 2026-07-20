const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf at array bounds", () => {
    // Create a test array
    const testArray = [1, 2, 3];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(testArray);

    // Test finding the last element
    return promise.dispatch("post", ["indexOf", [3]]).then((result: number) => {
      // The result should be 2 (last index)
      expect(result).toBe(2);

      // Now test with an element that doesn't exist (should not find at length)
      return promise.dispatch("post", ["indexOf", [99]]).then((result2: number) => {
        expect(result2).toBe(-1);
      });
    });
  });
});