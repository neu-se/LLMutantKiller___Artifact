import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly process sparse arrays with Q.all", () => {
    // Create a sparse array that will trigger the specific code path
    const sparseArray = [1, , 3, , 5]; // indices 0, 2, 4 have values

    return Q.fcall(() => {
      // Create promises that will use the internal array_reduce through Q.all
      const promises = sparseArray.map((val, idx) => {
        if (idx in sparseArray) {
          return Q(val);
        }
        return Q(0);
      });

      return Q.all(promises).then((results) => {
        // Calculate sum using reduce - this will trigger the mutation
        const sum = results.reduce((acc, val) => acc + val, 0);
        // Original: 1 + 0 + 3 + 0 + 5 = 9
        // Mutated: --index causes incorrect iteration
        expect(sum).toBe(9);
      });
    });
  });
});