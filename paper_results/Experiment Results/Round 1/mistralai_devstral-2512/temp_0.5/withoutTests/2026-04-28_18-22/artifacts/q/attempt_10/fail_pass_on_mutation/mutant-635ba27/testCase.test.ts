const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array_indexOf with element at specific position", () => {
    // Create a test array where the mutation would cause different behavior
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Use Q to create a promise that resolves to the array
    const promise = Q(testArray);
    // Test finding element 5 which should be at index 4
    return promise.dispatch("post", ["indexOf", [5]]).then((result: number) => {
      // With the mutation (i--), this would either:
      // 1. Find index 4 immediately (if starting from high index)
      // 2. Never find it (if starting from 0 and decrementing)
      // The original code should find it at index 4
      expect(result).toBe(4);
    });
  });
});