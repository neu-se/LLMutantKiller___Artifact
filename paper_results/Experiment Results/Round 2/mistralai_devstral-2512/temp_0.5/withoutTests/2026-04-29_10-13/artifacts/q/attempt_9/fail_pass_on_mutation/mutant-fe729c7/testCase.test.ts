const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by checking hole detection", () => {
    const testArray = [1, , 3];
    let holeEncountered = false;

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (prev: any, curr: any, idx: number) => {
        if (idx === 1) {
          holeEncountered = true;
        }
        return prev;
      }, 0);
    }).then(() => {
      // Original code: holeEncountered should be false (hole is skipped)
      // Mutated code: holeEncountered should be true (hole is processed)
      expect(holeEncountered).toBe(false);
    });
  });
});