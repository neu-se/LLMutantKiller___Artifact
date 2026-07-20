import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("filters anonymous Q.js frames with multi-digit line numbers", async () => {
    Q.longStackSupport = true;

    try {
      // Step 1: Find the exact path format that qFileName uses by extracting it
      // from a named Q frame (attempt1 format, unaffected by mutation)
      let qFileNameFromStack: string | undefined;
      
      await Q.when(Q.resolve(1), function namedFn() {
        throw new Error("probe");
      }, undefined).then(undefined, function(e: any) {
        const lines: string[] = (e.stack || "").split("\n");
        for (const line of lines) {
          // Named frame format: "at functionName (path:line:col)"
          const m = /^\s*at\s+\S+\s+\((.+q\.js):\d+:\d+\)\s*$/.exec(line);
          if (m) {
            qFileNameFromStack = m[1];
            break;
          }
        }
      });

      if (!qFileNameFromStack) {
        throw new Error("Could not determine qFileName from stack");
      }

      // Step 2: Create an error with an anonymous Q.js frame using the EXACT same path
      // at a multi-digit line number that's within Q's internal range
      const customError = new Error("custom");
      const anonymousQFrame = `at ${qFileNameFromStack}:200:10`;
      customError.stack = `Error: custom\n    at userCode (test.js:5:1)\n    ${anonymousQFrame}`;

      let capturedError: any = null;
      await Q.when(Q.reject(customError), undefined, function(e: any) {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack || "";

      // Original (\d+): attempt2 parses anonymousQFrame correctly as [qFileName, 200]
      //   → isInternalFrame returns true → frame is FILTERED OUT
      // Mutated (\d): attempt2 parses anonymousQFrame as [qFileName+":20", 0] (wrong)
      //   → isInternalFrame returns false → frame is NOT filtered
      expect(stack).not.toContain(anonymousQFrame);
    } finally {
      Q.longStackSupport = false;
    }
  });
});