const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle sparse arrays in Q.all with reduce operation", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [, Q(2), Q(3)];

    // This test specifically targets the array_reduce implementation
    // The mutation removes the break statement which would cause infinite loop
    // when trying to find the first present index in a sparse array
    const testPromise = Q.all(sparseArray).then((result: any[]) => {
      // Calculate sum of present elements
      let sum = 0;
      for (let i = 0; i < result.length; i++) {
        if (i in result) {
          sum += result[i];
        }
      }
      return sum;
    });

    return testPromise.then((sum: number) => {
      // Original code should sum 2 + 3 = 5
      // Mutated code would hang due to infinite loop in reduce
      expect(sum).toBe(5);
    });
  });
});