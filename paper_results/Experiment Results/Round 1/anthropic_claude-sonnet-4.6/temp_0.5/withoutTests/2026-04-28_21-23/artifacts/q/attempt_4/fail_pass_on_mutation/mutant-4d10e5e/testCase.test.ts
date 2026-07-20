import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should extend error stack with long stack support", async () => {
    Q.longStackSupport = true;
    
    const originalStack = new Error("test").stack || "";
    let caughtError: Error | null = null;
    
    await Q.fcall(() => {
      throw new Error("deep error");
    }).fail((e: Error) => {
      caughtError = e;
    });
    
    Q.longStackSupport = false;
    
    expect(caughtError).not.toBeNull();
    const stack = (caughtError as Error).stack || "";
    // With longStackSupport and hasStacks=true, stack should contain the separator
    expect(stack).toContain("From previous event:");
  });
});