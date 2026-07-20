const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by tracking visited indices", () => {
    const testArray = [1, , 3, , 5];
    const visitedIndices: number[] = [];

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (acc: number, val: any, idx: number) => {
        visitedIndices.push(idx);
        return acc;
      }, 0);
    }).then(() => {
      // Original code: visitedIndices should be [0, 2, 4] (only existing indices)
      // Mutated code: visitedIndices should be [0, 1, 2, 3, 4] (all indices)
      expect(visitedIndices).toEqual([0, 2, 4]);
    });
  });
});