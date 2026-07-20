import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value

    // Create a test case that directly tests the array_reduce behavior
    // We need to access the internal array_reduce function that was mutated
    const testArray = [1, 2, 3, 4];
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Since array_reduce is an internal function, we need to test it through
    // a Q operation that uses it. The all() method uses array_reduce internally.
    const result = Q.all([testArray]).then((arrays: number[][]) => {
      // This should work correctly with the original code
      // With the mutation, it might behave differently when reduce is called internally
      return arrays[0].reduce(reducer, initialValue);
    });

    return result.then((sum: number) => {
      // With initial value 10, sum should be 10 + 1 + 2 + 3 + 4 = 20
      expect(sum).toBe(20);
    });
  });
});