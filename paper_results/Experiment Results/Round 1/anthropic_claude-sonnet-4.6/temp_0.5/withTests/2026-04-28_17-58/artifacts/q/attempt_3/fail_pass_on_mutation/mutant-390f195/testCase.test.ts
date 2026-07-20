import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not duplicate stack frames when error passes through multiple promise rejections", () => {
    Q.longStackSupport = true;

    const marker = "uniqueMarkerFunction_xyz";

    function uniqueMarkerFunction_xyz() {
      return Q.defer();
    }

    const deferred = uniqueMarkerFunction_xyz();

    const p1 = deferred.promise.then(null, function handler1(err: any) {
      throw err;
    });

    const p2 = p1.then(null, function handler2(err: any) {
      throw err;
    });

    const resultDeferred = Q.defer();

    p2.then(null, function finalHandler(err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      // Count how many times the marker function name appears in the stack
      // With original code: __minimumStackCounter__ is set properly, so
      // the same stack section is not duplicated across multiple rethrows.
      // With mutated code: __minimumStackCounter__ is always undefined,
      // so the stack keeps growing with duplicates on each rethrow.
      const count = (stack.match(/uniqueMarkerFunction_xyz/g) || []).length;
      try {
        // Should appear exactly once (or a small bounded number), not multiplied
        // by the number of rethrows
        expect(count).toBeLessThanOrEqual(2);
        resultDeferred.resolve(null);
      } catch (e) {
        resultDeferred.reject(e);
      }
    });

    const error = new Error("test rejection");
    deferred.reject(error);

    return resultDeferred.promise;
  });
});