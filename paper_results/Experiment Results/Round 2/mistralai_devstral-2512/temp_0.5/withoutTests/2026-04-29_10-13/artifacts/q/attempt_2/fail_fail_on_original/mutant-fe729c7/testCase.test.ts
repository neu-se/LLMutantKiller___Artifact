import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce", () => {
    const testArray = [1, , 3];
    let callbackCount = 0;

    return Q(testArray).then((arr: any[]) => {
      return Array.prototype.reduce.call(arr, (acc: number, val: any, idx: number) => {
        callbackCount++;
        return acc;
      }, 0);
    }).then(() => {
      // Original code: callbackCount should be 2 (only indices 0 and 2)
      // Mutated code: callbackCount should be 3 (all indices 0, 1, 2)
      expect(callbackCount).toBe(2);
    });
  });
});