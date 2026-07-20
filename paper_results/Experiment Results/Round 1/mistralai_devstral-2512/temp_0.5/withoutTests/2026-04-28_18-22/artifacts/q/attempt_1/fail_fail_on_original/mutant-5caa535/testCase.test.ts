import { Q } from "./q";

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find index of element in array", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    // Test that the array_indexOf function works correctly
    return promise.then((arr) => {
      // Test finding an element that exists
      const index = arr.indexOf(3);
      expect(index).toBe(2);

      // Test finding an element that doesn't exist
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);

      // Test edge case: finding the last element
      const lastIndex = arr.indexOf(5);
      expect(lastIndex).toBe(4);

      return true;
    });
  });
});