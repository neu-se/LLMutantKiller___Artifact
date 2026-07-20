import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame", () => {
  it("only filters q.js frames", async () => {
    Q.longStackSupport = true;
    
    try {
      // Get the real promise stack to find q.js line numbers
      const probe = Q.defer();
      const realStack = probe.promise.stack as string || "";
      probe.resolve(null);
      
      // Find a line number from q.js frames (these are within [qStartingLine, qEndingLine])
      let lineInRange: number | null = null;
      for (const line of realStack.split("\n")) {
        const m = line.match(/:(\d+):\d+\)/);
        if (m) {
          lineInRange = parseInt(m[1]);
          break;
        }
      }
      
      if (!lineInRange) {
        // Can't determine line range, skip
        return;
      }
      
      // Now create a deferred with a fake stack using a DIFFERENT filename
      // at the same line number (which is within [qStartingLine, qEndingLine])
      const deferred = Q.defer();
      deferred.promise.stack = `    at fn (/completely/different/file.js:${lineInRange}:1)`;
      deferred.promise.stackCounter = 1;
      
      const err = new Error("test");
      deferred.reject(err);
      const caught = await deferred.promise.then(null, (e: Error) => e);
      
      // Original: fileName check → /completely/different/file.js != q.js → NOT filtered
      // Mutated: no fileName check → lineInRange in [qStartingLine, qEndingLine] → IS filtered
      expect(caught.stack).toContain("different/file.js");
    } finally {
      Q.longStackSupport = false;
    }
  });
});