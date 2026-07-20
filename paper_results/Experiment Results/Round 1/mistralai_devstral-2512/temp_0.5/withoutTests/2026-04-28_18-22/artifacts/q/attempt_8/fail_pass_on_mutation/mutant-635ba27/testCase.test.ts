const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find element in array using indexOf", () => {
    // Create a test array where the mutation would cause different behavior
    const testArray = [1, 2, 3, 4, 5];
    // Use Q to create a promise that resolves to the array
    const promise = Q(testArray);
    // Test finding element 3 which should be at index 2
    return promise.dispatch("post", ["indexOf", [3]]).then((result: number) => {
      // With the mutation (i--), this would either:
      // 1. Find index 2 immediately (if starting from high index)
      // 2. Never find it (if starting from 0 and decrementing)
      // The original code should find it at index 2
      expect(result).toBe(2);
    });
  });
});