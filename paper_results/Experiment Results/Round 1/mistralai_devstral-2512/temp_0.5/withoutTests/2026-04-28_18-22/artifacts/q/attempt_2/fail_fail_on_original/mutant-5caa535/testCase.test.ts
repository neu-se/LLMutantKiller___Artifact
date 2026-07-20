import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with non-existent elements", () => {
    // Create a test array with 5 elements
    const testArray = [1, 2, 3, 4, 5];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: number[]) => {
      // Test finding an element that doesn't exist
      // This should return -1 in the original code
      // In the mutated code (i <= this.length), it will try to access arr[5] which is undefined
      // and might return 5 instead of -1
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);

      // Also test with empty array
      const emptyArray: number[] = [];
      const emptyIndex = emptyArray.indexOf(1);
      expect(emptyIndex).toBe(-1);

      return true;
    });
  });
});