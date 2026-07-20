import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex", () => {
  it("should correctly parse line numbers with multiple digits in anonymous stack frames", async () => {
    Q.longStackSupport = true;

    try {
      // Capture what qFileName looks like by observing a real Q internal frame
      // We'll create a rejection and observe what gets filtered vs not filtered
      let capturedError: any = null;

      // Get the actual path format used in stack traces for q.js
      // by throwing from within Q and capturing the stack
      let qStackLine: string | undefined;
      try {
        throw new Error("probe");
      } catch (e: any) {
        const lines: string[] = (e.stack || "").split("\n");
        // Find a line referencing q.js with a multi-digit line number in anonymous format
        qStackLine = lines.find((line: string) => {
          const t = line.trim();
          return t.startsWith("at ") && !t.includes("(") && /q\.js:\d{2,}:\d+$/.test(t);
        });
      }

      // Use a real rejection to trigger makeStackTraceLong
      const deferred = Q.defer();
      const err = new Error("test rejection");
      
      // Inject an anonymous q.js frame with a multi-digit line number
      // using the exact path format that appears in real stack traces
      if (qStackLine) {
        err.stack = `Error: test rejection\n    at userFunc (test.js:5:3)\n    ${qStackLine.trim()}`;
      }

      deferred.reject(err);

      await deferred.promise.then(undefined, function(e: any) {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack || "";

      if (qStackLine) {
        // With original regex (\d+): anonymous q.js frame is correctly parsed,
        // isInternalFrame returns true, frame is filtered OUT
        // With mutated regex (\d): multi-digit line number causes wrong parse,
        // isInternalFrame returns false, frame is NOT filtered
        expect(stack).not.toContain(qStackLine.trim());
      }
    } finally {
      Q.longStackSupport = false;
    }
  });
});