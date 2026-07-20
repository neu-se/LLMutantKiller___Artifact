import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should filter named Q internal frames when qFileName is correctly set", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      // Throw from inside a .then() callback so Q internal frames appear in error.stack
      await Q.when(Q.resolve(1), function() {
        throw new Error("test error");
      }, undefined).then(undefined, function(e: any) {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack || "";

      expect(stack).toContain("From previous event:");

      // Named Q internal frames like _fulfilled, runSingle, flush should be filtered
      // If qFileName is correctly set (original): isInternalFrame returns true → filtered
      // If qFileName is wrong (mutation corrupts captureLine result): isInternalFrame returns false → NOT filtered
      expect(stack).not.toContain("_fulfilled");
      expect(stack).not.toContain("runSingle");
    } finally {
      Q.longStackSupport = false;
    }
  });
});