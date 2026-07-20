import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack filtering", () => {
  it("error stack is not empty after Q rejection handling with longStackSupport", async () => {
    Q.longStackSupport = true;

    try {
      function thrower() {
        throw new Error("oops");
      }

      let capturedError: Error | null = null;
      const d = Q.defer();
      d.promise.then(null, (e: Error) => { capturedError = e; });
      
      try { thrower(); } catch(e) { d.reject(e); }

      await new Promise<void>(r => setTimeout(r, 50));

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      const frameLines = stack.split('\n').filter((l: string) => l.match(/^\s+at\s/));
      
      // Original: user frames preserved → frameLines.length > 0
      // Mutated: user frames filtered → frameLines.length === 0
      expect(frameLines.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});