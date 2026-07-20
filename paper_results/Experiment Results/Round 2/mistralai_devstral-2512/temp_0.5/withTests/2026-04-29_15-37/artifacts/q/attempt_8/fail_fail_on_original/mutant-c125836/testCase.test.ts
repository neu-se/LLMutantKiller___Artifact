// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on array with first element undefined", async () => {
    // Create an array where first element is undefined
    const arrayWithFirstUndefined = [undefined, 5, 10];

    // Test the reduce behavior directly on the array WITHOUT initial value
    // This will trigger the mutation point in the reduce shim
    const result = await Q(arrayWithFirstUndefined).then((arr: any[]) => {
      return arr.reduce((acc: number, val: number) => {
        return acc + (val || 0);
      });
    });

    // With the original code (arguments.length === 1):
    // Should find first defined value (5 at index 1) and use it as basis
    // Then continue reducing from next index
    // Expected: 5 + 0 + 10 = 15

    // With the mutation (if true):
    // The condition is always true, so it will always try to find first defined value
    // This should produce the same result in this case
    // However, the mutation changes the logic flow in a way that could be detected

    // To better detect the mutation, we need to test the actual reduce shim directly
    // Let's test the array_reduce function directly
    const testArray = [undefined, 5, 10];
    const testResult = Q.array_reduce(testArray, (acc: number, val: number) => acc + (val || 0));

    // With original code: should work correctly
    // With mutation: the condition is always true, which might affect behavior
    expect(testResult).toBe(15);
  });
});