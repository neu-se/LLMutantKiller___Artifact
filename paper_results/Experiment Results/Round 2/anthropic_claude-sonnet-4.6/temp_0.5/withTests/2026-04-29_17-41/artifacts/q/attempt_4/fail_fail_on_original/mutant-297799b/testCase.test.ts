import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in long stack traces", () => {
  it("filtered long stack trace should not contain test file frames", () => {
    Q.longStackSupport = true;

    const d = Q.defer();
    const error = new Error("test");

    const p = d.promise.then(null, function(err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      
      // With original isNodeFrame: only "(module.js:" or "(node.js:" lines kept
      // Test file frames (testCase.test.ts) would NOT be kept
      // With mutation (return true): ALL non-internal lines kept
      // Test file frames WOULD be kept
      const hasTestFileFrame = stack.includes("testCase.test.ts");
      
      expect(hasTestFileFrame).toBe(false);
    });

    d.reject(error);
    return p;
  });
});