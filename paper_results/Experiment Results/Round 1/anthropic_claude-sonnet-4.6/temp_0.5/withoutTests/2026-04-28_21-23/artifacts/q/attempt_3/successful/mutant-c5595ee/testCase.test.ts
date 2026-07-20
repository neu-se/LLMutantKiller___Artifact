import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q attempt3 regex for Firefox-style anonymous frames", () => {
  it("should filter Firefox-style Q internal frames with empty function name from long stack traces", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a helper deferred to get Q's internal file path and line number
      const helperDeferred = Q.defer<void>();
      const qStack: string = (helperDeferred.promise as any).stack || "";
      helperDeferred.resolve();

      if (!qStack) {
        return; // No stack support in this environment
      }

      // Parse Q's file path and a line number from the V8-style stack
      const firstLine = qStack.split("\n")[0];
      const pathMatch = /\((.+):(\d+):\d+\)/.exec(firstLine);
      if (!pathMatch) {
        return; // Cannot determine Q's file path
      }

      const qFilePath = pathMatch[1];
      const qLineNum = parseInt(pathMatch[2], 10);

      // Create a Firefox-style frame with EMPTY function name: "@filename:lineNumber"
      // Original regex /.*@(.+):(\d+)$/ matches this (.*  matches zero characters)
      // Mutated regex /.@(.+):(\d+)$/ does NOT match (. requires exactly one character before @)
      const firefoxFrame = `@${qFilePath}:${qLineNum}`;

      // Inject this Firefox-style frame as the promise's stack
      const deferred = Q.defer<void>();
      (deferred.promise as any).stack = firefoxFrame;
      (deferred.promise as any).stackCounter = 1;

      // Create a user error with a simple stack
      const userError = new Error("test error");
      userError.stack = "Error: test error\n    at userFunction (/user/code.js:1:1)";

      deferred.reject(userError);

      let caughtError: Error | null = null;
      await deferred.promise.fail((e: Error) => {
        caughtError = e;
        return null;
      });

      expect(caughtError).not.toBeNull();
      const finalStack = caughtError!.stack!;

      // Only proceed if makeStackTraceLong was actually triggered
      if (!finalStack.includes("From previous event:")) {
        return;
      }

      // With original regex: "@qFilePath:qLineNum" is parsed by attempt3,
      // recognized as a Q internal frame (same file, line in Q's internal range),
      // and filtered OUT of the final stack.
      //
      // With mutated regex: "@qFilePath:qLineNum" cannot be parsed because
      // /.@/ requires exactly one character before @, but there are zero,
      // so isInternalFrame returns false and the frame remains in the stack.
      expect(finalStack).not.toContain(firefoxFrame);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});