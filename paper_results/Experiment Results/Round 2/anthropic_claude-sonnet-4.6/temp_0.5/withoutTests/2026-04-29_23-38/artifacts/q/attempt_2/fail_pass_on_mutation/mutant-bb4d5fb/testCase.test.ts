import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("should preserve stack frames from non-Q files in long stack traces", async () => {
    Q.longStackSupport = true;

    function userFunction() {
      return Q.reject(new Error("user error"));
    }

    let capturedStack: string | undefined;
    
    await userFunction().fail((err: any) => {
      capturedStack = err.stack;
    }).then(() => {
      // stack should contain reference to this test file
      expect(capturedStack).toBeDefined();
      expect(capturedStack).toContain("testCase.test");
    });
  });
});