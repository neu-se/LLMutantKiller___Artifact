import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with sparse arrays", () => {
  it("should resolve with correct values for a sparse array, treating missing indices as undefined", () => {
    // The array_reduce shim's sparse array handling affects how Q processes arrays
    // With the mutation (if true instead of if (index in this)), 
    // the reduce shim would incorrectly use undefined as the initial basis
    // This tests Q.all behavior which internally uses array_reduce
    const promises: any[] = [];
    promises[0] = Q(1);
    promises[2] = Q(3);
    // promises[1] is undefined (sparse)

    return Q.all(promises).then(function(result: any[]) {
      expect(result[0]).toBe(1);
      expect(result[1]).toBeUndefined();
      expect(result[2]).toBe(3);
      expect(result.length).toBe(3);
    });
  });
});