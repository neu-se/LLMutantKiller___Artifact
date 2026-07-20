import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

// [500 blank lines]

describe("Q isInternalFrame fileName check", () => {
  it("should only filter frames from q.js file, not from other files", async () => {
    const savedLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      const deferred = Q.defer(); // This line must be > qStartingLine (~437)
      const error = new Error("test rejection");
      deferred.reject(error);
      
      const caught = await deferred.promise.then(
        null,
        (e: Error) => e
      );
      
      // In original code: isInternalFrame checks fileName === qFileName
      // so frames from testCase.test.ts are NOT filtered
      // In mutated code: fileName check is removed, so frames from testCase.test.ts
      // at line numbers >= qStartingLine ARE filtered
      expect(caught.stack).toContain("testCase.test.ts");
    } finally {
      Q.longStackSupport = savedLongStackSupport;
    }
  });
});