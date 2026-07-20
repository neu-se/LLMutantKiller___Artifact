import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame >= boundary", () => {
  it("should filter frames at exactly qStartingLine from long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedStack = "";

    await new Promise<void>((resolve) => {
      // Create a deferred chain so Q builds a long stack trace
      const d = Q.defer();
      
      d.promise
        .then(() => {
          throw new Error("inner error");
        })
        .fail((err: Error) => {
          capturedStack = err.stack || "";
          resolve();
        });

      d.resolve(1);
    });

    // The filtered stack should not contain Q's internal file references
    // between qStartingLine and qEndingLine.
    // With >= (original): the frame at qStartingLine IS filtered out
    // With > (mutant): the frame at qStartingLine leaks through
    // 
    // We count occurrences of Q's filename in the stack.
    // The "From previous event:" separator is added by Q when building
    // long stacks. After filtering, Q internal frames should be removed.
    // If the boundary frame leaks, we'd see an extra Q internal frame.
    
    // The stack should contain "From previous event:" indicating long stack was built
    expect(capturedStack).toContain("From previous event:");
    
    // After filtering, no Q-internal frames should remain.
    // Q internal frames reference q.js. With the mutant, the frame at
    // qStartingLine (which is in q.js) leaks through.
    const lines = capturedStack.split("\n");
    const qInternalLines = lines.filter(line => 
      line.includes("q.js") && !line.includes("node_modules")
    );
    
    // With original (>=): all Q internal frames filtered → 0 q.js lines
    // With mutant (>): frame at qStartingLine leaks → at least 1 q.js line
    expect(qInternalLines.length).toBe(0);
  });
});