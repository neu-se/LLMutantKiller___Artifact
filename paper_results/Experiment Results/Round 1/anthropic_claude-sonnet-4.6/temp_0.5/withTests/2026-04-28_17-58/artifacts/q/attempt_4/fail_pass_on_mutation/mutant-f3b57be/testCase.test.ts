import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with reduce fallback", () => {
  it("resolves with first fulfilled value", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.reduce = originalReduce;
    return QFresh.any([QFresh.resolve(42)]).then((val: number) => {
      expect(val).toBe(42);
    });
  });
});