describe("Q getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("should use $ anchor so attempt2 only matches lines ending with :col", async () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;

    // Override Error.prepareStackTrace to produce anonymous lines with trailing content:
    // "    at FILE:LINE:COL extra"
    // For index===0 we add a fake "@" so captureLine picks lines[1] (Q's own frame)
    // instead of lines[2] (Jest loader frame).
    (Error as any).prepareStackTrace = function (
      _err: Error,
      structuredStackTrace: any[]
    ) {
      return structuredStackTrace
        .map((frame: any, index: number) => {
          const fileName = frame.getFileName() || "";
          const lineNumber = frame.getLineNumber() || 0;
          const colNumber = frame.getColumnNumber() || 0;
          const funcName = frame.getFunctionName() || "";
          if (index === 0) {
            // Include "@" so lines[0].indexOf("@") > 0 → captureLine uses lines[1]
            return `    at ${funcName}@${fileName}:${lineNumber}:${colNumber} extra`;
          }
          return `    at ${fileName}:${lineNumber}:${colNumber} extra`;
        })
        .join("\n");
    };

    try {
      // Reload Q so its captureLine() runs under the new prepareStackTrace
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      const qPath = require.resolve(
        "../../../../../../../../../../../subject_repositories/q/q.js"
      );

      Q.longStackSupport = true;

      let caughtError: any;
      await new Promise<void>((resolve) => {
        Q.fcall(() => {
          throw new Error("test");
        }).then(null, (e: any) => {
          caughtError = e;
          resolve();
        });
      });

      expect(caughtError).toBeDefined();
      expect(caughtError.message).toBe("test");

      // Original ($): captureLine can't parse "at FILE:LINE:COL extra" → qFileName=undefined
      //   → no frames filtered → caughtError.stack contains qPath  → PASS
      // Mutated (no $): captureLine parses "at FILE:LINE:COL extra" → qFileName=qPath
      //   → Q's own frames filtered out → caughtError.stack lacks qPath → FAIL
      expect(caughtError.stack).toContain(qPath);
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});