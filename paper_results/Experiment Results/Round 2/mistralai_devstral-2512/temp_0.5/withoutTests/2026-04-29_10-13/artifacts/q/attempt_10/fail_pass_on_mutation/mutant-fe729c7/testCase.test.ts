const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by verifying hole behavior", () => {
    const testArray = [1, , 3];
    const executionOrder: number[] = [];

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (prev: any, curr: any, idx: number) => {
        executionOrder.push(idx);
        return prev;
      }, 0);
    }).then(() => {
      // Original code: executionOrder should be [0, 2] (skipping hole at index 1)
      // Mutated code: executionOrder should be [0, 1, 2] (processing all indices)
      expect(executionOrder).toEqual([0, 2]);
    });
  });
});