import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("preserves user code frames and removes Q internal frames in filtered stack traces", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    // Create a chain where makeStackTraceLong will be invoked
    await Q.reject(new Error("sentinel error"))
      .fail(function myUserHandler(e: any) {
        caughtError = e;
      });

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";

    // The stack should contain "sentinel error" 
    expect(stack).toContain("sentinel error");

    // With original code: Q-internal lines are filtered OUT
    // With mutated code: only Q-internal lines are KEPT (user lines removed)
    // So with mutation, lines referencing q.js internals would dominate
    // and lines from this test file would be absent

    const stackLines = stack.split("\n").filter((l: string) => l.includes("    at ") || l.includes("@"));
    
    // Count frames from q.js vs frames from test file
    const qFrames = stackLines.filter((l: string) => /\bq\.js\b/.test(l));
    const userFrames = stackLines.filter((l: string) => l.includes("testCase.test"));

    // Original: user frames kept, q.js frames removed -> userFrames > 0, qFrames == 0
    // Mutated: only q.js frames kept -> userFrames == 0, qFrames > 0
    expect(userFrames.length).toBeGreaterThan(0);
    expect(qFrames.length).toBe(0);

    Q.longStackSupport = false;
  });
});