import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle sparse arrays with holes in reduce", () => {
    // Create a sparse array with specific pattern to trigger the mutation
    const sparseArray = [1, , , 4]; // indices 0 and 3 have values, 1 and 2 are holes

    return Q.fcall(() => {
      // Use Q.all which internally uses array_reduce
      const promises = sparseArray.map((val, idx) => {
        if (idx in sparseArray) {
          return Q(val);
        }
        return Q(0); // Fill holes with 0
      });

      return Q.all(promises).then((results) => {
        const sum = results.reduce((acc, val) => acc + val, 0);
        // Original: correctly sums 1 + 0 + 0 + 4 = 5
        // Mutated: --index causes incorrect iteration through sparse array
        expect(sum).toBe(5);
      });
    });
  });
});