import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should filter Q internal frames from error stacks in long stack mode", async () => {
    Q.longStackSupport = true;
    
    let caughtError: Error | null = null;
    
    await Q.fcall(() => {
      throw new Error("test error");
    }).fail((e: Error) => {
      caughtError = e;
    });
    
    Q.longStackSupport = false;
    
    expect(caughtError).not.toBeNull();
    const stack = (caughtError as Error).stack || "";
    // Q's internal frames should be filtered out
    expect(stack).not.toContain("at Promise.prototype.then");
  });
});