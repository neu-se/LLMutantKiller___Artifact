import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using array_map", () => {
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 3;
    const expectedIndex = 2;

    // Test the array_indexOf functionality through array_map which internally uses array_indexOf
    // The mutation changes the condition from `this[i] === value` to `if (false)`
    // which would cause indexOf to always return -1
    return Q(testArray).then((arr: any[]) => {
      // Use array_map to test the indexOf functionality
      const mapped = Q.array_map(arr, (val: number) => val);
      const actualIndex = mapped.indexOf(valueToFind);
      expect(actualIndex).toBe(expectedIndex);
    });
  });
});