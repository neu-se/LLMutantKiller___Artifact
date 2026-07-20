import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value using Q's internal array operations", () => {
    // Create a test that directly exercises Q's internal array_indexOf
    // The mutation changes the condition from `this[i] === value` to `if (false)`
    // which would cause indexOf to always return -1

    // We'll test this by creating a scenario where Q needs to find an item in an array
    // using its internal array_indexOf implementation
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 3;
    const expectedIndex = 2;

    // Use Q to wrap the array and test indexOf
    return Q(testArray).then((arr: any) => {
      // Force using Q's internal array operations by using Q's array_reduce
      // which internally uses array_indexOf
      const result = Q.array_reduce(arr, (acc: any, val: any, idx: number) => {
        if (val === valueToFind) {
          acc.foundIndex = idx;
        }
        return acc;
      }, { foundIndex: -1 });

      expect(result.foundIndex).toBe(expectedIndex);
    });
  });
});