import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame", () => {
  it("only filters q.js frames in long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const probe = Q.defer();
      const probeStack: string = (probe.promise as any).stack || "";
      probe.resolve(null);

      // Get a line number from q.js (guaranteed to be in [qStartingLine, qEndingLine])
      const lineMatch = probeStack.match(/:(\d+):\d+\)/);
      if (!lineMatch) return;
      const lineNum = parseInt(lineMatch[1]);

      const deferred = Q.defer();
      // Set promise.stack to a frame from a non-q.js file at the same line number
      (deferred.promise as any).stack = `    at fn (/other/file.js:${lineNum}:1)`;
      (deferred.promise as any).stackCounter = 1;

      const err = new Error("test");
      // Set error.stack to something that doesn't contain "file.js"
      Object.defineProperty(err, "stack", {
        value: "Error: test\n    at internal",
        configurable: true,
        writable: true
      });

      deferred.reject(err);
      const caught = await deferred.promise.then(null, (e: Error) => e);

      // If makeStackTraceLong was NOT called, caught.stack = "Error: test\n    at internal"
      // which doesn't contain "file.js" - test would pass trivially on both versions
      
      // If makeStackTraceLong WAS called:
      // Original: /other/file.js frame NOT filtered → "file.js" in caught.stack
      // Mutated: /other/file.js frame IS filtered → "file.js" NOT in caught.stack

      // We need to ensure makeStackTraceLong is called
      // Check: if "From previous event:" is in caught.stack, makeStackTraceLong was called
      // and the test is meaningful
      
      // For the test to be valid, we need makeStackTraceLong to be called
      // Let's verify this by checking the separator
      if (!caught.stack.includes("From previous event:") && !caught.stack.includes("file.js")) {
        // makeStackTraceLong was not called - this test is inconclusive
        // Force a failure to indicate the test setup is wrong
        // Actually, let's just check for "file.js" directly
      }
      
      expect(caught.stack).toContain("file.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});