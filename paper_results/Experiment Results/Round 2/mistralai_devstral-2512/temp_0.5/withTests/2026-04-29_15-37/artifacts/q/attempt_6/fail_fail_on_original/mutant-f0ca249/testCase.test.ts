import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle sparse arrays in Q.allSettled", () => {
    // Create a sparse array that will trigger the specific code path
    const sparseArray: any[] = [1, , 3]; // indices 0 and 2 have values, index 1 is hole

    return Q.fcall(() => {
      // Create promises that will use the internal array_reduce through Q.allSettled
      const promises = sparseArray.map((val: any, idx: number) => {
        if (idx in sparseArray) {
          return Q(val);
        }
        return Q.reject(new Error("hole"));
      });

      return Q.allSettled(promises).then((results: any[]) => {
        // Original code: correctly processes sparse array with ++index
        // Mutated code: --index causes incorrect iteration
        expect(results.length).toBe(3);
        expect(results[0].state).toBe("fulfilled");
        expect(results[0].value).toBe(1);
        expect(results[1].state).toBe("rejected");
        expect(results[2].state).toBe("fulfilled");
        expect(results[2].value).toBe(3);
      });
    });
  });
});