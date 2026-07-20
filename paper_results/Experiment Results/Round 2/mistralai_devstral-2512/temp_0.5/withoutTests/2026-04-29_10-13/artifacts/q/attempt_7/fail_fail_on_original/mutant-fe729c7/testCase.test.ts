const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by detecting hole processing", () => {
    const testArray = [1, , 3];
    let holeDetected = false;

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (acc: number, val: any, idx: number, array: any) => {
        // Check if we're at a hole (index exists in array but value is undefined)
        if (idx === 1 && !(idx in array)) {
          holeDetected = true;
        }
        return acc;
      }, 0);
    }).then(() => {
      // Original code: holeDetected should be true (hole is properly detected)
      // Mutated code: holeDetected should be false (all indices treated as existing)
      expect(holeDetected).toBe(true);
    });
  });
});