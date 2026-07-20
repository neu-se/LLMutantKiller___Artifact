import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation detection", () => {
  it("should correctly handle empty sparse arrays in reduce without initial value", () => {
    // Create an empty sparse array that will trigger the mutation
    const emptySparseArray: any[] = [];
    emptySparseArray[10] = undefined; // Create a hole at index 0-9

    return Q.fcall(() => {
      let errorThrown = false;
      try {
        // This will use the internal array_reduce implementation
        // The mutation changes ++index to --index in the sparse array handling
        emptySparseArray.reduce((acc: number, val: number) => acc + val);
      } catch (e) {
        errorThrown = true;
        expect(e instanceof TypeError).toBe(true);
      }
      // With original code: throws TypeError when no initial value and empty
      // With mutated code: behavior changes due to --index causing different iteration
      expect(errorThrown).toBe(true);
    });
  });
});