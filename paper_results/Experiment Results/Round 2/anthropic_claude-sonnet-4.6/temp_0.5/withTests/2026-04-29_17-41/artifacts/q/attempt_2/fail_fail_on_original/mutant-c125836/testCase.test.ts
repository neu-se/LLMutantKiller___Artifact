import { createRequire } from "module";

describe("array_reduce fallback behavior with initial basis value", () => {
  it("should not overwrite the provided initial basis when array has elements", () => {
    // Remove Array.prototype.reduce before requiring the module
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;

    // Clear module cache and re-require
    const require = createRequire(import.meta.url);
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore
    (Array.prototype as any).reduce = originalReduce;

    // Now test: array_reduce with an explicit initial value should use that value
    // Q.all uses array_reduce(promises, fn, void 0)
    // With mutation: basis gets overwritten by first element (a promise object)
    // causing incorrect behavior
    const d1 = Q.defer();
    const d2 = Q.defer();
    d1.resolve(1);
    d2.resolve(2);

    return Q.all([d1.promise, d2.promise]).then((result: any) => {
      expect(result).toEqual([1, 2]);
    });
  });
});