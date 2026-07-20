import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior via long stack traces", () => {
  it("should include user code frames in long stack traces, not just internal Q frames", async () => {
    Q.longStackSupport = true;

    try {
      function userFunction() {
        return Q.reject(new Error("test error from user code"));
      }

      let capturedError: Error | null = null;

      await userFunction().catch((err: Error) => {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";

      // The stack should contain something meaningful - with the original code,
      // filterStackString keeps non-internal, non-node frames (user code).
      // With the mutation, filterStackString only keeps internal Q frames,
      // so the stack would be empty or contain only Q internals.
      // 
      // We verify that the filtered stack is non-empty and contains
      // user-visible content (the error message at minimum should survive,
      // and user frames should be present).
      expect(stack.length).toBeGreaterThan(0);

      // The stack should contain the error message
      expect(stack).toContain("test error from user code");

      // With original code: non-internal frames are kept, so "userFunction" 
      // or test file references should appear in the stack.
      // With mutated code: only internal Q frames are kept, so user function
      // names would be stripped out, leaving only Q internals or empty lines.
      // 
      // The first line of the stack is the error message itself (not filtered),
      // but subsequent lines should include user code frames with original code.
      // Let's check that there are actual stack frame lines beyond just the message.
      const lines = stack.split("\n").filter((line: string) => line.trim().length > 0);
      
      // There should be multiple lines - at least the error message and some frames
      expect(lines.length).toBeGreaterThan(1);

      // With original code, user code frames (containing test file path or userFunction)
      // should be present. With mutated code, these would be filtered OUT and only
      // Q-internal frames would remain (or the result would be nearly empty).
      const frameLines = lines.slice(1); // skip the "Error: ..." line
      
      // At least one frame should be present that is NOT a Q internal frame
      // (i.e., not from q.js itself as an internal frame)
      // With original: user frames are kept
      // With mutation: only Q internal frames are kept, user frames removed
      const hasNonQFrame = frameLines.some((line: string) => 
        line.includes("userFunction") || 
        line.includes("testCase.test") ||
        line.includes("Object.<anonymous>")
      );
      
      expect(hasNonQFrame).toBe(true);
    } finally {
      Q.longStackSupport = false;
    }
  });
});