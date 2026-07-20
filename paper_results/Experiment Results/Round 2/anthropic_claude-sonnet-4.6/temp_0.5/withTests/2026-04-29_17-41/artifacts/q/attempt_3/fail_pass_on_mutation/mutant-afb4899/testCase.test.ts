import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("uses $ anchor so lines with trailing content are not matched", async () => {
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;

    try {
      (Error as any).prepareStackTrace = function (_err: Error, frames: any[]) {
        return frames
          .map((frame: any) => {
            const file = frame.getFileName() || "<anonymous>";
            const line = frame.getLineNumber() || 0;
            const col = frame.getColumnNumber() || 0;
            return `    at ${file}:${line}:${col} [extra]`;
          })
          .join("\n");
      };

      jest.resetModules();
      // Use require so we can use the same relative path as the static import
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

      freshQ.longStackSupport = true;

      const err = await new Promise<Error>((resolve, reject) => {
        freshQ
          .when(freshQ(), function () {
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
      expect(stack).toContain("q.js");
    } finally {
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }
  });
});