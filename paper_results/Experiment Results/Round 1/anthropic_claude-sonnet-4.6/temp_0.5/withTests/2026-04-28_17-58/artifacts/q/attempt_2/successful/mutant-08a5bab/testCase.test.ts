import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should preserve user frames in filtered stack traces when longStackSupport is enabled", (done) => {
    Q.longStackSupport = true;

    const UNIQUE_FUNCTION_NAME = "veryUniqueUserFunctionNameXYZ123";

    const obj: Record<string, () => Q.Promise<never>> = {};
    obj[UNIQUE_FUNCTION_NAME] = function veryUniqueUserFunctionNameXYZ123() {
      const d = Q.defer<never>();
      setTimeout(function () {
        d.reject(new Error("rejection"));
      }, 0);
      return d.promise;
    };

    obj[UNIQUE_FUNCTION_NAME]().then(null, function (err: Error) {
      Q.longStackSupport = false;
      // The stack should contain frames from the user's file (this test file)
      // With the mutation, isInternalFrame returns true for all frames from any file
      // where lineNumber <= qEndingLine, which would filter out user frames too
      const stack = err.stack || "";
      expect(stack).toContain("veryUniqueUserFunctionNameXYZ123");
      done();
    });
  });
});