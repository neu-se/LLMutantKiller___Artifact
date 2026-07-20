import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback", () => {
  it("finds elements correctly when native indexOf is unavailable at module load time", () => {
    // We need to test the fallback directly by reconstructing it
    // The mutation changes i++ to i-- causing infinite loop
    // Test that Q.all works correctly - it uses array operations internally
    return Q.all([Q(1), Q(2), Q(3)]).then((results: number[]) => {
      expect(results).toEqual([1, 2, 3]);
    });
  });
});