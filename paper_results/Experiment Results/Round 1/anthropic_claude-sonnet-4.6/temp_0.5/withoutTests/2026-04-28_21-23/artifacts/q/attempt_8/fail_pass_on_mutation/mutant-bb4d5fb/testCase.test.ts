import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack trace isInternalFrame", () => {
  it("stack before separator contains user frames not Q frames", async () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    
    function triggerRejection() {
      d.reject(new Error("test"));
    }
    triggerRejection();
    
    let caught: any;
    await new Promise<void>(resolve => {
      d.promise.then(null, (e: any) => { caught = e; resolve(); });
    });
    
    const stack: string = caught.stack || "";
    const separatorIndex = stack.indexOf("From previous event:");
    
    if (separatorIndex === -1) {
      // makeStackTraceLong didn't run - nothing to test
      expect(stack).toContain("triggerRejection");
      return;
    }
    
    const stackBeforeSeparator = stack.substring(0, separatorIndex);
    // Original: user frames like triggerRejection appear before separator
    // Mutation: user frames filtered out, nothing before separator
    expect(stackBeforeSeparator).toContain("triggerRejection");
  });
});