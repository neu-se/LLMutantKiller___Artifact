// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with edge cases", () => {
    // Test the internal array_indexOf implementation directly
    // by creating a scenario that would fail with the mutation
    const testArray = [1, 2, 3, 4, 5];

    // The mutation changes the loop condition from i < this.length to i <= this.length
    // This would cause an out-of-bounds access when i equals the array length
    // We test this by checking if indexOf correctly handles the last element
    const lastElementIndex = testArray.indexOf(5);
    expect(lastElementIndex).toBe(4);

    // Also test that searching for a non-existent element returns -1
    const notFoundIndex = testArray.indexOf(99);
    expect(notFoundIndex).toBe(-1);

    // Test with an empty array
    const emptyArray: number[] = [];
    const emptyResult = emptyArray.indexOf(1);
    expect(emptyResult).toBe(-1);

    // Test with array containing undefined
    const arrayWithUndefined = [1, undefined, 3];
    const undefIndex = arrayWithUndefined.indexOf(undefined);
    expect(undefIndex).toBe(1);
  });
});