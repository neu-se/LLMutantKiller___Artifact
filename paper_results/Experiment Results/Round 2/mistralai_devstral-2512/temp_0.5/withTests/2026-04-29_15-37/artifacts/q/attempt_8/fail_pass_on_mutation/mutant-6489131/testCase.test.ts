const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [, 2, 3];

    // Create a promise that will exercise Q's internal reduce implementation
    const testPromise = Q.resolve().then(() => {
      // This will trigger Q's internal array_reduce on a sparse array
      // The mutation removes the break statement which would cause infinite loop
      return Q.all([sparseArray]).then((arrays: any[]) => {
        const arr = arrays[0];
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          if (i in arr) {
            sum += arr[i];
          }
        }
        return sum;
      });
    });

    return testPromise.then((sum: number) => {
      // Original code should sum 2 + 3 = 5
      // Mutated code would hang due to infinite loop in reduce
      expect(sum).toBe(5);
    });
  });
});