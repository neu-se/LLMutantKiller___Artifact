import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback behavior with sparse arrays", () => {
  it("Q.any should correctly handle sparse arrays by skipping missing indices", () => {
    // Q.any uses array_reduce internally with the 'undefined' basis
    // The sparse array handling in the reduce shim matters when no initial value is provided
    // With mutation (if true), undefined slots get processed as values
    const sparse: any[] = new Array(3);
    sparse[1] = Q.resolve(42);
    // sparse[0] and sparse[2] are holes

    return Q.any(sparse).then((result: any) => {
      expect(result).toBe(42);
    });
  });
});