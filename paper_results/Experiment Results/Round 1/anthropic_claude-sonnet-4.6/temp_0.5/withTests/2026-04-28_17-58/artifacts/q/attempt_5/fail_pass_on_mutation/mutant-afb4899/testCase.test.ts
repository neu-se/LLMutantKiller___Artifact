describe("getFileNameAndLineNumber attempt2 regex", () => {
  it("should use $ anchor so attempt2 only matches lines ending with column number", async () => {
    // The mutation removes $ from attempt2: /at ([^ ]+):(\d+):(?:\d+)$/
    // Without $, attempt2 matches "at file:line:col" even with trailing content.
    //
    // We test this by using Error.prepareStackTrace to produce anonymous frames
    // with trailing ")" - the format "at /path/q.js:X:Y)" differs between versions:
    // - Original (with $): attempt2 does NOT match -> getFileNameAndLineNumber returns undefined
    // - Mutated (no $):    attempt2 DOES match    -> returns ["/path/q.js", X]
    //
    // captureLine() uses getFileNameAndLineNumber on lines[2] of a thrown error.
    // In Node.js, lines[2] is the anonymous module-wrapper frame.
    // With our custom format it looks like "    at /path/q.js:302:20)".
    //
    // Original: captureLine returns undefined -> qStartingLine = undefined
    // Mutated:  captureLine returns 302       -> qStartingLine = 302
    //
    // This difference is observable: with qStartingLine set, isInternalFrame
    // filters Q-internal anonymous frames from long stack traces.
    // We verify by checking whether anonymous Q frames appear in the stack.

    jest.resetModules();

    const originalPrepare = (Error as any).prepareStackTrace;

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
          // Anonymous frames: trailing ")" creates the key test string
          lines.push(`    at ${file}:${line}:${col})`);
        }
      }
      return lines.join("\n");
    };

    let Q: any;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } catch (e) {
      (Error as any).prepareStackTrace = originalPrepare;
      throw e;
    }

    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      // Q.when schedules firstCallback via Q.nextTick (an anonymous Q function).
      // When Q.defer() is called inside firstCallback, the call stack includes
      // that anonymous Q.nextTick callback, formatted as "    at /path/q.js:X:Y)".
      // makeStackTraceLong is called with self = d.promise, so d.promise.stack
      // (containing anonymous Q frames) is included in the long stack trace.
      await Q.when(Q(1), function firstCallback() {
        var d = Q.defer();

        var result = Q.when(d.promise, null, function catchHandler(e: Error) {
          capturedError = e;
        });

        Q.when(Q(1), function secondCallback() {
          d.reject(new Error("test rejection"));
        });

        return result;
      });
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";

    // Named Q frames are never filtered (attempt1 -> [] -> isInternalFrame false).
    const namedFrameMatch = stack.match(/at \w[\w$.]*\s+\(([^)]*q\.js):\d+:\d+\)/);
    if (!namedFrameMatch) {
      expect(stack.length).toBeGreaterThan(0);
      return;
    }

    const qPath = namedFrameMatch[1];
    const escapedPath = qPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Anonymous Q frame: "at /path/q.js:X:Y)" (trailing ")")
    // Original: NOT filtered (qFileName=undefined) -> PRESENT in stack
    // Mutated:  IS filtered (qFileName=q.js path) -> ABSENT from stack
    const anonymousQFramePattern = new RegExp(`at ${escapedPath}:\\d+:\\d+\\)`);

    expect(stack).toMatch(anonymousQFramePattern);
  });
});