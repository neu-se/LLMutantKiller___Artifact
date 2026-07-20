import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("filters only Q internal frames, not user frames", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a promise chain that will trigger makeStackTraceLong
      const d1 = Q.defer();
      const d2 = Q.defer();

      const chain = d1.promise.then(function userStep1() {
        return d2.promise;
      }).then(function userStep2() {
        throw new Error("test");
      });

      d1.resolve(1);
      d2.resolve(2);

      await new Promise<void>((resolve) => {
        chain.then(null, (err: Error) => {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = capturedError!.stack || "";
      
      // Verify makeStackTraceLong actually ran
      expect(stack).toContain("From previous event");
      // Verify user frames are preserved (original) vs filtered (mutated)
      expect(stack).toContain("userStep2");
    } finally {
      Q.longStackSupport = false;
    }
  });
});