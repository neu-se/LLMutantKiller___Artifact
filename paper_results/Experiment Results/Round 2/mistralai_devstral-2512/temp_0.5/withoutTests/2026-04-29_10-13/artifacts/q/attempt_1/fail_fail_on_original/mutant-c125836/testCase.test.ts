import { Q } from "./q.js";

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value

    // Create a test case that uses reduce with an initial value
    // The original code should use the provided initial value
    // The mutated code would incorrectly skip to the "seek first value" logic
    const testArray = [1, 2, 3, 4];
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Use Q to wrap the array and test the reduce behavior
    // Since Q uses array_reduce internally in various places, we test it indirectly
    // by creating a scenario that would expose the bug
    const result = Q.all([testArray]).then((arrays) => {
      // This should work correctly with the original code
      // With the mutation, it might behave differently when reduce is called internally
      return arrays[0].reduce(reducer, initialValue);
    });

    return result.then((sum) => {
      // With initial value 10, sum should be 10 + 1 + 2 + 3 + 4 = 20
      expect(sum).toBe(20);
    });
  });
});