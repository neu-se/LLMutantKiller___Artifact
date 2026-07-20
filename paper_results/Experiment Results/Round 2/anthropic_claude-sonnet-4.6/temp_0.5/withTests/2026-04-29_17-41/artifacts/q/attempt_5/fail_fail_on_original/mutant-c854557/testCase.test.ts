import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering of anonymous Q.js frames", () => {
  it("should filter anonymous Q.js frames with multi-digit line numbers from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const qPath: string = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Create an error whose stack contains an anonymous Q.js frame at a multi-digit line number.
      // When makeStackTraceLong processes this, it should filter out the Q.js frame.
      // Original regex (\d+): correctly parses "at q.js:100:5" → filename=q.js, line=100 → filtered
      // Mutated regex (\d): greedily parses "at q.js:100:5" → filename="q.js:10", line=0 → NOT filtered
      const customError = new Error("test");
      const anonymousQFrame = `at ${qPath}:100:5`;
      customError.stack = `Error: test\n    at userFunction (test.js:10:5)\n    ${anonymousQFrame}`;

      let capturedError: any = null;

      // Rejecting with this error and catching triggers makeStackTraceLong,
      // which filters the stack
      await Q.when(Q.reject(customError), undefined, function(e: any) {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack || "";

      // The anonymous Q.js frame at line 100 should be filtered out
      expect(stack).not.toContain(anonymousQFrame);
    } finally {
      Q.longStackSupport = false;
    }
  });
});