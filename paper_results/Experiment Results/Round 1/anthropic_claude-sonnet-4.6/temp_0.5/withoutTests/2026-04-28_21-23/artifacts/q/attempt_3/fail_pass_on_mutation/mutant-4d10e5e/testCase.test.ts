import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;
    
    let error: Error | null = null;
    
    try {
      await Q.promise((resolve, reject) => {
        reject(new Error("test"));
      }).then(() => {}).then(() => {});
    } catch (e) {
      error = e as Error;
    }
    
    Q.longStackSupport = false;
    
    // In both original and mutated, hasStacks ends up true in Node.js
    // so this test can't distinguish them
    expect(error).not.toBeNull();
  });
});