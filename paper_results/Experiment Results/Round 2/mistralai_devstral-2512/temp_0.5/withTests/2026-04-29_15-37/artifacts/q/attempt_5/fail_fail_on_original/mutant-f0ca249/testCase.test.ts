import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly process sparse arrays in promise resolution", () => {
    // Create a sparse array that will trigger the specific code path
    const sparseArray = [, 2, , 4]; // Only indices 1 and 3 have values

    return Q.fcall(() => {
      // Create promises that will use the internal array_reduce
      const promises = sparseArray.map((val, idx) => {
        if (idx in sparseArray) {
          return Q(val * 2);
        }
        return Q(0);
      });

      return Q.all(promises).then((results) => {
        // Original code: correctly processes sparse array with ++index
        // Mutated code: --index causes incorrect iteration
        expect(results).toEqual([0, 4, 0, 8]);
      });
    });
  });
});