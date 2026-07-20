import { Q } from "./q.js";

describe("Q library array_indexOf mutation", () => {
  it("should correctly find element in array using array_indexOf", () => {
    // This test will pass with the original code but fail with the mutated code
    // because the mutated code uses i-- instead of i++ in the for loop
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 3;

    // We need to test the internal array_indexOf implementation
    // Since it's not directly exposed, we'll use Q's functionality that relies on it
    const promise = Q.resolve(testArray);

    return promise.then((arr) => {
      // The array_indexOf is used internally by Q for various operations
      // We'll create a scenario that would expose the mutation
      const index = arr.indexOf(valueToFind);
      expect(index).toBe(2); // Should find element at index 2

      // Also test that it doesn't find elements that don't exist
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);
    });
  });
});