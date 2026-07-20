import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Firefox-style stack frame line number parsing", () => {
  it("should filter Q-internal Firefox-style stack frames in long stack traces", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Probe a deferred promise to extract the exact filename Q uses internally
      // (same as qFileName set by captureLine())
      const probe = Q.defer<void>();
      const probeStack: string = (probe.promise as any).stack || "";

      let qFilename: string | null = null;
      for (const line of probeStack.split("\n")) {
        const m1 = /^\s*at .+ \((.+):(\d+):\d+\)$/.exec(line);
        if (m1) { qFilename = m1[1]; break; }
        const m2 = /^\s*at ([^ ]+):(\d+):\d+$/.exec(line);
        if (m2) { qFilename = m2[1]; break; }
      }

      // If we can't determine the filename, we can't run this test
      expect(qFilename).not.toBeNull();
      if (!qFilename) return;

      // Construct a Firefox-style stack frame that looks like a Q-internal frame.
      // Line 500 is well within Q's range (qStartingLine ~35 to qEndingLine ~1900+).
      const firefoxInternalFrame = `promiseDispatch@${qFilename}:500`;

      // Create an error whose stack contains this Firefox-style internal frame
      const error = new Error("test rejection");
      error.stack = [
        "Error: test rejection",
        firefoxInternalFrame,
        "    at Object.<anonymous> (/external/test/file.js:1:1)"
      ].join("\n");

      let capturedStack: string | undefined;

      const deferred = Q.defer<never>();
      const resultPromise = deferred.promise.fail((err: Error) => {
        capturedStack = err.stack;
        return "handled";
      });

      deferred.reject(error);
      await resultPromise;

      expect(capturedStack).toBeDefined();

      // With original regex (\d+):
      //   attempt3 matches "promiseDispatch@<qFilename>:500"
      //   getFileNameAndLineNumber returns [qFilename, 500]
      //   isInternalFrame: true (same file, line in range)
      //   filterStackString removes this line → NOT in capturedStack
      //
      // With mutated regex (\D+):
      //   attempt3 fails to match (500 is all digits, \D+ requires non-digits)
      //   getFileNameAndLineNumber returns undefined
      //   isInternalFrame: false → line is kept → IS in capturedStack
      expect(capturedStack).not.toContain(firefoxInternalFrame);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});