describe("getFileNameAndLineNumber attempt2 $ anchor", () => {
  it("should use $ anchor so attempt2 only matches lines ending with column number", async () => {
    jest.resetModules();

    const originalPrepare = (Error as any).prepareStackTrace;

    // ALL frames: no function name, trailing ")"
    // This makes lines[2] in captureLine anonymous: "    at /path/q.js:X:Y)"
    // - Original attempt2 with $: no match -> qFileName=undefined -> no filtering
    // - Mutated attempt2 no $: matches -> qFileName="/path/q.js" -> q.js frames filtered
    (Error as any).prepareStackTrace = function (err: Error, frames: any[]) {
      const lines = [err.toString()];
      for (const frame of frames) {
        const file = (frame.getFileName && frame.getFileName()) || "<anonymous>";
        const line = (frame.getLineNumber && frame.getLineNumber()) || 0;
        const col = (frame.getColumnNumber && frame.getColumnNumber()) || 0;
        lines.push(`    at ${file}:${line}:${col})`);
      }
      return lines.join("\n");
    };

    // Use require (synchronous) to ensure prepareStackTrace is active during captureLine
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      const d = Q.defer();

      d.promise.fail(function (e: Error) {
        capturedError = e;
      });

      // Reject d from an async Q callback so d.promise.stack
      // contains q.js frames (the async call stack)
      Q.when(Q(1), function asyncCallback() {
        d.reject(new Error("test rejection"));
      });

      // Wait for async operations to complete
      await new Promise<void>((resolve) => setTimeout(resolve, 100));
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";

    // With longStackSupport, makeStackTraceLong concatenates stacks
    expect(stack).toContain("From previous event:");

    // d.promise.stack was captured when Q.defer() was called synchronously.
    // It contains the call stack at that point: [defer(q.js), test code]
    // With ALL-anonymous format, q.js frames appear as "at /path/q.js:X:Y)"
    //
    // Original: qFileName=undefined -> NOT filtered -> q.js path present after separator
    // Mutated:  qFileName=q.js path -> IS filtered -> q.js path absent after separator
    const afterSeparator = stack.split("From previous event:")[1] || "";
    expect(afterSeparator).toMatch(/q\.js/);
  });
});