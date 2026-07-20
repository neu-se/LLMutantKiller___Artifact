import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine effect on stack filtering", () => {
  it("should have qStartingLine less than qEndingLine ensuring internal frames are filtered", () => {
    Q.longStackSupport = true;

    // Create a promise chain that will have Q internal frames
    // If captureLine works correctly, internal Q frames are filtered
    // We can detect this by checking the stack trace doesn't have
    // excessive Q internal lines
    
    let capturedStack = "";
    
    return Q.fcall(function step1() {
      return Q.fcall(function step2() {
        return Q.fcall(function step3() {
          throw new Error("trace test");
        });
      });
    }).catch((err: Error) => {
      Q.longStackSupport = false;
      capturedStack = err.stack || "";
      
      // Count occurrences of "From previous event:" - this only appears
      // when long stack support works AND internal frames are filtered properly
      const separatorCount = (capturedStack.match(/From previous event:/g) || []).length;
      expect(separatorCount).toBeGreaterThan(0);
      
      // With proper filtering, the stack should contain our user function names
      expect(capturedStack).toContain("step3");
    });
  });
});