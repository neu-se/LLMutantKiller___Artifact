import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter node internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a chain that triggers makeStackTraceLong / filterStackString
      await Q.fcall(function testFunction() {
        throw new Error("test error");
      }).catch((err: Error) => {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";

      // With original code: isNodeFrame lines (containing "(module.js:" or "(node.js:")
      // are filtered OUT because: !isInternalFrame && !isNodeFrame && line
      // For a node frame: isNodeFrame=true → !isNodeFrame=false → whole condition false → excluded
      //
      // With mutated code: !isInternalFrame || (!isNodeFrame && line)
      // For a node frame: isNodeFrame=true, isInternalFrame=false
      // → !false || (!true && line) = true || false = true → INCLUDED
      //
      // So with the mutation, node frames like "(module.js:..." appear in the stack.
      expect(stack).not.toMatch(/\(module\.js:/);
      expect(stack).not.toMatch(/\(node\.js:/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});