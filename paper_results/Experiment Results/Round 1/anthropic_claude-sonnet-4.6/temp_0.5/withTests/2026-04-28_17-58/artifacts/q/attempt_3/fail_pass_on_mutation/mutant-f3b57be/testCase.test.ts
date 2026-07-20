import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback without initial value", () => {
  it("correctly reduces using first element as basis when no initial value is provided", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    
    return QFresh.all([QFresh.resolve(10), QFresh.resolve(20)]).then((results: number[]) => {
      expect(results).toEqual([10, 20]);
    });
  });
});