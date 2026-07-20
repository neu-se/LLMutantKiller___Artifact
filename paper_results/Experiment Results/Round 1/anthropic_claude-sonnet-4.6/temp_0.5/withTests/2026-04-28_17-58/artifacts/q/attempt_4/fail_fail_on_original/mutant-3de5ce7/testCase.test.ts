import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Firefox-style stack frame parsing in getFileNameAndLineNumber", () => {
  it("should filter Firefox-style internal Q frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Detect Q's filename using multiple regex patterns to handle different path formats
      let qFileName: string | null = null;
      try {
        throw new Error();
      } catch (e) {
        const lines = ((e as Error).stack || "").split("\n");
        for (const line of lines) {
          // Try named function format: "at functionName (/path/q.js:42:10)"
          let m = /\((.+q\.js):\d+:\d+\)/.exec(line);
          if (m) { qFileName = m[1]; break; }
          // Try anonymous format: "at /path/q.js:42:10"
          m = /at (.+q\.js):\d+:\d+/.exec(line);
          if (m) { qFileName = m[1]; break; }
        }
      }

      if (!qFileName) {
        throw new Error("Could not determine Q filename from stack trace");
      }

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