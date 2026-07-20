import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks mutation detection", () => {
  it("error stack after rejection does not contain Q internal implementation details", async () => {
    Q.longStackSupport = true;
    
    try {
      let capturedError: Error | null = null;
      
      // Create a multi-step chain to trigger makeStackTraceLong
      const result = await Q.fcall(function step1() {
        return Q.fcall(function step2() {
          return Q.fcall(function step3() {
            throw new Error("test error");
          });
        });
      }).catch(function(e: Error) {
        capturedError = e;
        return null;
      });
      
      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      
      // The stack should contain "From previous event:" showing long stacks work
      expect(stack).toContain("From previous event:");
      
      // And Q internal frames should be filtered out
      // "runSingle" is an internal Q function that should not appear
      expect(stack).not.toContain("runSingle");
    } finally {
      Q.longStackSupport = false;
    }
  });
});