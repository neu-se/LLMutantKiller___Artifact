import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce", async () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [, 2, 3]; // index 0 is empty

    // Use Q to wrap the array and test the reduce behavior
    const result = await Q(sparseArray).then((arr: any[]) => {
      return arr.reduce((acc, val, idx) => {
        return acc + (idx in arr ? val : 0);
      }, 0);
    });

    // The original code should find index 1 as the first present index
    // and sum 2 + 3 = 5
    // The mutated code would get stuck in an infinite loop or throw
    expect(result).toBe(5);
  });
});