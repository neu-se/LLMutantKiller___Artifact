import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("filterStackString should produce empty string for typical app stack lines in original code", () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      const error = new Error("test error for isNodeFrame detection");

      deferred.reject(error);

      // With longStackSupport enabled and a deferred promise (which has .stack),
      // makeStackTraceLong is called when the rejection propagates through .then()
      // Original: isNodeFrame returns false for app frames -> filterStackString returns ""
      // Mutant: isNodeFrame returns true for all -> filterStackString returns full stack

      return deferred.promise.then(
        () => { throw new Error("should not fulfill"); },
        (err: any) => {
          const stack: string = err.stack || "";
          // Original: filtered to "" because no (module.js: or (node.js: lines
          // Mutant: kept because isNodeFrame always returns true
          expect(stack).toBe("");
        }
      );
    } finally {
      Q.longStackSupport = false;
    }
  });
});