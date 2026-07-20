import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("direct stack filtering test", () => {
  it("detects mutation in isInternalFrame", async () => {
    Q.longStackSupport = true;

    try {
      // Capture a reference error stack to see what format frames are in
      let errorStack = "";
      
      function namedFunction(): void {
        throw new Error("named function error");
      }

      try {
        namedFunction();
      } catch (e: any) {
        errorStack = e.stack || "";
      }

      // Verify we can see named function in raw stack
      expect(errorStack).toContain("namedFunction");

      // Now pass through Q's rejection handling
      let capturedError: Error | null = null;
      
      function throwingFunction(): void {
        throw new Error("q rejection error");  
      }

      const d = Q.defer();
      const p = d.promise.then(function() {
        throwingFunction();
      });
      d.resolve(1);

      await new Promise<void>((resolve) => {
        p.then(null, (err: Error) => {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const qStack = capturedError!.stack || "";
      
      // throwingFunction should appear in the stack
      // Original: user frames not filtered (fileName !== qFileName)
      // Mutated: user frames filtered (true && lineNumber <= qEndingLine)
      expect(qStack).toContain("throwingFunction");
    } finally {
      Q.longStackSupport = false;
    }
  });
});