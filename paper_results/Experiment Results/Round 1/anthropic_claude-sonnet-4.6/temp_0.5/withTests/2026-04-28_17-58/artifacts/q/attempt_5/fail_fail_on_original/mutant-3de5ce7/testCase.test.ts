import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

describe("Firefox-style stack frame parsing in getFileNameAndLineNumber", () => {
  it("should filter Firefox-style internal Q frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Get Q's actual file path using require.resolve
      const require = createRequire(import.meta.url);
      const qFileName = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

      const MARKER = "UNIQUE_FIREFOX_FRAME_MARKER";
      const testError = new Error("rejection");
      const rejectedPromise = Q.reject(testError);

      // Set a Firefox-style stack on the promise referencing Q's own file at line 500
      // (well within Q's qStartingLine..qEndingLine range)
      (rejectedPromise as any).stack = `${MARKER}@${qFileName}:500`;
      (rejectedPromise as any).stackCounter = 0;

      let finalStack = "";
      await rejectedPromise.fail((e: Error) => {
        finalStack = e.stack || "";
      });

      // Original code (\d+): "500" matches attempt3 → isInternalFrame=true → MARKER filtered out
      // Mutated code (\D+): "500" doesn't match attempt3 → isInternalFrame=false → MARKER stays
      expect(finalStack).not.toContain(MARKER);
    } finally {
      Q.longStackSupport = false;
    }
  });
});