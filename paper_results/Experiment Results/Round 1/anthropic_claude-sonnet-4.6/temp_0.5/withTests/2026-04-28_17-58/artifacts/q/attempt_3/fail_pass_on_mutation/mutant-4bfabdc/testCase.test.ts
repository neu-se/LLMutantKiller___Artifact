import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should filter out empty/falsy lines from stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await Q.fcall(function level1() {
        return Q.fcall(function level2() {
          throw new Error("test");
        });
      }).catch((err: Error) => {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";
      const lines = stack.split("\n");

      // With original code: empty/falsy lines are filtered out
      // because the condition requires `line` to be truthy.
      // With mutated code: !isInternalFrame("") = true, so the OR short-circuits
      // and empty lines pass through.
      const emptyLines = lines.filter((line: string) => line === "");
      expect(emptyLines.length).toBe(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});