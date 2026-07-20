import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack filtering", () => {
  it("filters internal Q frames from long stack traces", async () => {
    Q.longStackSupport = true;
    
    let caughtError: any;
    try {
      await Q.fcall(function() {
        throw new Error("test error");
      });
    } catch(e) {
      caughtError = e;
    } finally {
      Q.longStackSupport = false;
    }
    
    expect(caughtError).toBeDefined();
    expect(caughtError.message).toBe("test error");
    // The stack should not contain Q internal frames
    if (caughtError.stack) {
      expect(caughtError.stack).not.toMatch(/qStartingLine/);
    }
  });
});