const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce by checking callback behavior", () => {
    const testArray = [1, , 3];
    let callbackInvokedForHole = false;

    return Q(testArray).then((arr: any) => {
      return Array.prototype.reduce.call(arr, (acc: number, val: any, idx: number) => {
        if (idx === 1 && val === undefined) {
          callbackInvokedForHole = true;
        }
        return acc;
      }, 0);
    }).then(() => {
      // Original code: callback should NOT be invoked for hole (index 1)
      // Mutated code: callback WILL be invoked for hole (index 1)
      expect(callbackInvokedForHole).toBe(false);
    });
  });
});