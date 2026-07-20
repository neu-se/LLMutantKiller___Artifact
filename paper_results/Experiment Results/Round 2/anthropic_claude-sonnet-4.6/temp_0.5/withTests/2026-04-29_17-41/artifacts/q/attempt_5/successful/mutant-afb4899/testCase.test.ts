import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("uses $ anchor so lines with trailing content are not matched by attempt2", async () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;

    try {
      // Create stack lines where:
      // - First frame has '@' so captureLine uses lines[1] (a q.js frame) not lines[2] (loader)
      // - All frames have trailing content " [extra]" after column number
      // With $ anchor (original): attempt2 won't match → qFileName=undefined → no filtering
      // Without $ anchor (mutant): attempt2 matches → qFileName=q.js path → Q frames filtered
      (Error as any).prepareStackTrace = function (_err: Error, frames: any[]) {
        return frames
          .map((frame: any, i: number) => {
            const file = frame.getFileName() || "<anonymous>";
            const line = frame.getLineNumber() || 0;
            const col = frame.getColumnNumber() || 0;
            if (i === 0) {
              return `fn@${file}:${line}:${col} [extra]`;
            }
            return `    at ${file}:${line}:${col} [extra]`;
          })
          .join("\n");
      };

      jest.resetModules();
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
      freshQ.longStackSupport = true;

      const err = await new Promise<Error>((resolve, reject) => {
        freshQ
          .when(freshQ(), function () {
            // Inside Q's event loop: stack has multiple Q frames
            const d = freshQ.defer();
            d.reject(new Error("test rejection"));
            return d.promise;
          })
          .then(
            () => reject(new Error("Should not fulfill")),
            (e: Error) => resolve(e)
          );
      });

      const stack = err.stack || "";
      // Original ($): qFileName=undefined → no Q frame filtering → "q.js" in stack
      // Mutant (no $): qFileName=q.js path → Q frames filtered → no "q.js" in stack
      expect(stack).toContain("q.js");
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});