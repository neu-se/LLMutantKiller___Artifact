describe("getFileNameAndLineNumber attempt2 regex $ anchor", () => {
  it("should only match stack lines where the column number is at the end of the string", async () => {
    jest.resetModules();

    const originalPrepare = (Error as any).prepareStackTrace;

    // Custom stack format: anonymous frames get trailing ")" after column number.
    // This creates lines like "at /path/q.js:300:5)" for anonymous frames.
    // - Original regex (with $): does NOT match (trailing ")" prevents $ from matching)
    // - Mutated regex (without $): DOES match (finds "at /path/q.js:300:5" within string)
    (Error as any).prepareStackTrace = function (err: Error, frames: any[]) {
      const lines = [err.toString()];
      for (const frame of frames) {
        const file = (frame.getFileName && frame.getFileName()) || "<anonymous>";
        const line = (frame.getLineNumber && frame.getLineNumber()) || 0;
        const col = (frame.getColumnNumber && frame.getColumnNumber()) || 0;
        const name = frame.getFunctionName && frame.getFunctionName();
        if (name) {
          lines.push(`    at ${name} (${file}:${line}:${col})`);
        } else {
          // Anonymous frames: trailing ")" after column number
          lines.push(`    at ${file}:${line}:${col})`);
        }
      }
      return lines.join("\n");
    };

    let Q: any;
    try {
      // Load Q fresh so captureLine() runs with our custom prepareStackTrace.
      // captureLine() processes lines[2] which is the anonymous module-wrapper frame:
      //   "    at /path/q.js:302:20)"
      // Original: attempt2 with $ -> no match -> qFileName = undefined
      // Mutated:  attempt2 no $  -> matches  -> qFileName = "/path/q.js"
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } catch (e) {
      (Error as any).prepareStackTrace = originalPrepare;
      throw e;
    }

    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      // Q.all uses an anonymous callback that calls defer().
      // When defer() runs inside that anonymous callback, promise.stack captures
      // the call stack which includes anonymous Q frames like:
      //   "    at /path/q.js:X:Y)"
      // Original: qFileName=undefined -> isInternalFrame always false -> frames NOT filtered
      // Mutated:  qFileName="/path/q.js" -> isInternalFrame true for anon Q frames -> filtered
      await Q.all([Q.reject(new Error("test rejection"))]).catch(function (e: Error) {
        capturedError = e;
      });
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack || "";

    // Named Q frames are never filtered (attempt1 -> [] -> isInternalFrame false).
    // Use one to find the q.js file path.
    const namedFrameMatch = stack.match(/at \w[\w$.]*\s+\((.+[/\\]q\.js):\d+:\d+\)/);
    if (!namedFrameMatch) {
      // Cannot locate q.js path; basic sanity check only
      expect(stack.length).toBeGreaterThan(0);
      return;
    }

    const qPath = namedFrameMatch[1];
    const escapedPath = qPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Anonymous Q frame pattern: "at /path/q.js:X:Y)" (trailing ")")
    // Present in original (not filtered), absent in mutated (filtered out).
    const anonymousQFramePattern = new RegExp(
      `at ${escapedPath}:\\d+:\\d+\\)`
    );

    expect(stack).toMatch(anonymousQFramePattern);
  });
});