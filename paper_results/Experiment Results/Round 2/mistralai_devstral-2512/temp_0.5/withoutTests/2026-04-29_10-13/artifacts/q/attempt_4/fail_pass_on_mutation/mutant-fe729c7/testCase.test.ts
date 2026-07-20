const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by counting iterations", () => {
    const testArray = [1, , 3, , 5];
    let iterationCount = 0;
    let sum = 0;

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (acc: number, val: any, idx: number) => {
        iterationCount++;
        sum += val || 0;
        return acc;
      }, 0);
    }).then(() => {
      // Original code: iterationCount should be 3 (only indices 0, 2, 4)
      // Mutated code: iterationCount should be 5 (all indices 0, 1, 2, 3, 4)
      expect(iterationCount).toBe(3);
      // Additional check to ensure we're getting the right sum
      expect(sum).toBe(9);
    });
  });
});