import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack traces preserve application frames in original but filter them all in mutant", () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      const error = new Error("test error for isNodeFrame detection");

      deferred.reject(error);

      return deferred.promise.then(
        () => { throw new Error("should not fulfill"); },
        (err: any) => {
          const stack: string = err.stack || "";
          // Original: isNodeFrame returns false for app frames
          // filterStackString condition is !isInternalFrame && !isNodeFrame
          // so app frames ARE kept -> stack is non-empty and contains test file reference
          //
          // Mutant: isNodeFrame always returns true
          // !isNodeFrame is always false -> NO frames pass -> stack becomes ""
          expect(stack.length).toBeGreaterThan(0);
          expect(stack).toContain("testCase.test.ts");
        }
      );
    } finally {
      Q.longStackSupport = false;
    }
  });
});