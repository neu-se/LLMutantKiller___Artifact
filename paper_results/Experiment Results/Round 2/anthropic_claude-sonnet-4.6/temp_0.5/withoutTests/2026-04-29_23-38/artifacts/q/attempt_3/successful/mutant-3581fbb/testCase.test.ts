import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should retain application frames in filtered stack, not discard them", async () => {
    Q.longStackSupport = true;

    // Create a promise chain that will be rejected, triggering makeStackTraceLong
    // which calls filterStackString on the error's stack
    const originalError = new Error("sentinel error");
    
    // Capture the original stack before Q processes it
    const originalStack = originalError.stack || "";
    
    // The original stack should have "at" frames from this test
    const originalAtLines = originalStack.split("\n").filter(l => l.trim().startsWith("at "));
    expect(originalAtLines.length).toBeGreaterThan(0);

    let processedError: any = null;

    // Create a deferred promise and reject it, then catch in a .then()
    // This triggers _rejected -> makeStackTraceLong -> filterStackString
    const d = Q.defer();
    
    const p = d.promise.then(
      null,
      function rejectionHandler(err: any) {
        processedError = err;
        return null;
      }
    );

    d.reject(originalError);
    await p;

    expect(processedError).not.toBeNull();
    const processedStack: string = processedError.stack || "";
    
    // In original code: filterStackString keeps non-node, non-internal frames
    // Application frames (like those from this test file) ARE kept
    // So processedStack should still have "at" lines
    
    // In mutated code: filterStackString only keeps node frames (module.js, node.js)
    // Modern Node.js has no such frames in user stacks
    // So processedStack would have NO "at" lines after filtering
    
    const processedAtLines = processedStack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    
    // Original: should have application frames preserved
    // Mutated: would have zero frames (no module.js/node.js frames in modern Node)
    expect(processedAtLines.length).toBeGreaterThan(0);
  });
});