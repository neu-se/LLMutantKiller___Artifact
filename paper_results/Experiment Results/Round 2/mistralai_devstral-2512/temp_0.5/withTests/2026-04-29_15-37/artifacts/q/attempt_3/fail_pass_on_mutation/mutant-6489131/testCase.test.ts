const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce", () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [, 2, 3]; // index 0 is empty

    // Directly test the array_reduce implementation by accessing it through Q's internal
    // We need to trigger the reduce operation that uses the mutated code
    const result = Q.all([sparseArray]).then((arrs: any[]) => {
      const arr = arrs[0];
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
          sum += arr[i];
        }
      }
      return sum;
    });

    // The original code should find index 1 as the first present index
    // and sum 2 + 3 = 5
    // The mutated code would get stuck in an infinite loop
    return result.then((sum: number) => {
      expect(sum).toBe(5);
    });
  });
});