const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find element at specific position using array_indexOf", () => {
    // Create a test array where the mutation would cause different behavior
    const testArray = [10, 20, 30, 40, 50];
    // Use Q to create a promise that resolves to the array
    const promise = Q(testArray);
    // Test finding element 40 which should be at index 3
    return promise.dispatch("post", ["indexOf", [40]]).then((result: number) => {
      // With the mutation (i--), this would either:
      // 1. Find index 3 immediately (if starting from high index)
      // 2. Never find it (if starting from 0 and decrementing)
      // The original code should find it at index 3
      expect(result).toBe(3);
    });
  });
});