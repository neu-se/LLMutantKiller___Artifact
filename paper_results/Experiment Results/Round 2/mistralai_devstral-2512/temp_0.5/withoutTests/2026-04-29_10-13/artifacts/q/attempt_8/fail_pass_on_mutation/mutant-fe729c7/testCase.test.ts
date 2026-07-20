const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by counting iterations", () => {
    const testArray = [1, , 3];
    let iterationCount = 0;

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (prev: any, curr: any, idx: number) => {
        iterationCount++;
        return prev;
      }, 0);
    }).then(() => {
      // Original code: iterationCount should be 2 (only indices 0 and 2)
      // Mutated code: iterationCount should be 3 (all indices 0, 1, 2)
      expect(iterationCount).toBe(2);
    });
  });
});