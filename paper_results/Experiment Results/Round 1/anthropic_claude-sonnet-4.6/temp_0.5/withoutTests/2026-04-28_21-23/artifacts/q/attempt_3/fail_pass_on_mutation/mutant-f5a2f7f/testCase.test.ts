import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should filter internal Q frames from long stack traces", async () => {
    Q.longStackSupport = true;
    
    let capturedError: Error | null = null;
    
    await Q.Promise((resolve: Function, reject: Function) => {
      reject(new Error("test error"));
    }).catch((err: Error) => {
      capturedError = err;
    });
    
    expect(capturedError).not.toBeNull();
    expect((capturedError as unknown as Error).stack).toBeDefined();
    // The stack should not contain Q internal frames
    const stack = (capturedError as unknown as Error).stack || "";
    expect(stack).not.toContain("captureLine");
  });
});