import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads and captureLine works correctly", () => {
  it("should successfully resolve a promise, indicating the module initialized without errors from captureLine", async () => {
    // The captureLine function is called during module initialization to set
    // qStartingLine and qEndingLine. If the mutation causes captureLine to
    // not return early when hasStacks is false, it could cause initialization
    // errors. We verify the module works correctly end-to-end.
    const result = await Q.Promise(function(resolve: (v: number) => void) {
      resolve(42);
    });
    expect(result).toBe(42);

    // Verify that long stack traces work (they depend on captureLine returning valid line numbers)
    Q.longStackSupport = true;
    try {
      const deferred = Q.defer();
      deferred.resolve(100);
      const val = await deferred.promise;
      expect(val).toBe(100);
    } finally {
      Q.longStackSupport = false;
    }
  });
});