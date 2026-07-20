import * as path from "path";

describe("array_reduce fallback with initial value", () => {
  it("should use provided initial basis value, not overwrite it with first array element", () => {
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;

    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const Q = require(modulePath);

    (Array.prototype as any).reduce = originalReduce;

    // Q.all uses array_reduce(promises, fn, void 0)
    // With mutation: basis (void 0) gets overwritten by promises[0]
    // causing the first promise to be processed incorrectly
    const d1 = Q.defer();
    const d2 = Q.defer();
    d1.resolve(10);
    d2.resolve(20);

    return Q.all([d1.promise, d2.promise]).then((result: any) => {
      expect(result).toEqual([10, 20]);
    });
  });
});