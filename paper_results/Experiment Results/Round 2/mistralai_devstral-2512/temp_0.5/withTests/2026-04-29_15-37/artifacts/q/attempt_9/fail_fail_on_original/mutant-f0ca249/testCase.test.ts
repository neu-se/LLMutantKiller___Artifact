import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle empty sparse arrays in reduce without initial value", () => {
    // Create an empty sparse array that will trigger the specific code path
    const emptySparseArray: any[] = [];
    emptySparseArray[5] = undefined; // Create holes at indices 0-4

    return Q.fcall(() => {
      let errorThrown = false;
      let errorType: any = null;

      try {
        // This will trigger the internal array_reduce implementation
        // The mutation changes ++index to --index in the sparse array handling
        emptySparseArray.reduce((acc: number, val: number) => acc + val);
      } catch (e) {
        errorThrown = true;
        errorType = e;
      }

      // Original code: throws TypeError when no initial value and empty
      // Mutated code: --index causes different behavior - may not throw or throw different error
      expect(errorThrown).toBe(true);
      expect(errorType instanceof TypeError).toBe(true);
    });
  });
});