import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should preserve non-Q frames in filtered stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    const originalStack = error.stack;
    
    const promise = Q.reject(error);
    
    try {
      await promise.then(() => {}).fail((err: any) => { throw err; });
    } catch (e: any) {
      // With mutation, isInternalFrame returns true for all frames,
      // so filterStackString removes all lines, resulting in empty stack
      // With original, only Q internal frames are removed
      expect(e.stack).toBeTruthy();
      expect(e.stack.length).toBeGreaterThan(0);
      // The stack should contain our test file reference
      expect(e.stack).toContain("testCase.test");
    }
  });
});