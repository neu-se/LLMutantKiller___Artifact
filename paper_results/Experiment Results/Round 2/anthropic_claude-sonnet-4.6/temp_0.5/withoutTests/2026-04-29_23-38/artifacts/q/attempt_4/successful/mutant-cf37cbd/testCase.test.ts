import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber regex for anonymous frames", () => {
  it("should parse anonymous Q frames with multi-digit column numbers in long stack traces", async () => {
    // Get the path to q.js by capturing a stack frame that includes it
    let qPath = "";
    Q.longStackSupport = true;
    const deferred = Q.defer<void>();
    const rawStack: string = (deferred.promise as any).stack || "";
    Q.longStackSupport = false;

    // Extract q.js path from the captured stack
    const stackLines = rawStack.split("\n");
    for (const line of stackLines) {
      const match = /\((.+q\.js):\d+:\d+\)/.exec(line) || /at (.+q\.js):\d+:\d+/.exec(line);
      if (match) {
        qPath = match[1];
        break;
      }
    }

    expect(qPath).toBeTruthy();

    const originalPrepareStackTrace = (Error as any).prepareStackTrace;

    // Force Q frames to appear in anonymous format (no function name, no parens)
    // This exercises the attempt2 regex in getFileNameAndLineNumber
    (Error as any).prepareStackTrace = function(err: Error, stack: any[]): string {
      const frames = stack.map((frame: any): string => {
        const fileName: string = frame.getFileName() || "";
        const lineNumber: number = frame.getLineNumber();
        const colNumber: number = frame.getColumnNumber();
        if (fileName === qPath) {
          // Anonymous format: "at filename:line:col" (no function name, no parens)
          return `    at ${fileName}:${lineNumber}:${colNumber}`;
        }
        const funcName: string | null = frame.getFunctionName();
        if (funcName) {
          return `    at ${funcName} (${fileName}:${lineNumber}:${colNumber})`;
        }
        return `    at ${fileName}:${lineNumber}:${colNumber}`;
      }).join("\n");
      return `${err.toString()}\n${frames}`;
    };

    Q.longStackSupport = true;

    let capturedStack = "";

    try {
      await new Promise<void>((resolve) => {
        Q.when(42)
          .then(function userFunction() {
            throw new Error("user error");
          })
          .fail(function(e: any) {
            capturedStack = e.stack || "";
            resolve();
          });
      });
    } finally {
      Q.longStackSupport = false;
      (Error as any).prepareStackTrace = originalPrepareStackTrace;
    }

    // makeStackTraceLong should have run and augmented the stack with the separator
    expect(capturedStack).toContain("From previous event:");

    // After filtering, no Q frames should remain in the stack
    // Original: attempt2 regex (\d+) matches multi-digit columns → Q frames filtered
    // Mutation: attempt2 regex (\d) only matches single-digit columns → Q frames with col >= 10 remain
    const lines = capturedStack.split("\n");
    const qLines = lines.filter(line => line.includes(qPath));
    expect(qLines.length).toBe(0);
  });
});