import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber regex for anonymous frames", () => {
  it("should parse anonymous stack frames with multi-digit column numbers", async () => {
    // Get the path to q.js
    const qModule = require.resolve("q");
    
    // Override Error.prepareStackTrace to return anonymous format for Q frames
    // This ensures Q frames appear as "at /path/q.js:line:col" (no function name)
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    (Error as any).prepareStackTrace = function(error: Error, stack: NodeJS.CallSite[]) {
      return stack.map((frame) => {
        const fileName = frame.getFileName() || "";
        const lineNumber = frame.getLineNumber();
        const colNumber = frame.getColumnNumber();
        if (fileName === qModule) {
          // Force anonymous format for Q frames (no function name, no parens)
          // Column numbers in Q's source are typically >= 10
          return `    at ${fileName}:${lineNumber}:${colNumber}`;
        }
        const funcName = frame.getFunctionName();
        if (funcName) {
          return `    at ${funcName} (${fileName}:${lineNumber}:${colNumber})`;
        }
        return `    at ${fileName}:${lineNumber}:${colNumber}`;
      }).join("\n");
    };
    
    Q.longStackSupport = true;
    
    let capturedStack = "";
    
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
    
    Q.longStackSupport = false;
    (Error as any).prepareStackTrace = originalPrepareStackTrace;
    
    // makeStackTraceLong should have run
    expect(capturedStack).toContain("From previous event:");
    
    // After filtering, no Q frames should remain
    const lines = capturedStack.split("\n");
    const qLines = lines.filter(line => line.includes(qModule));
    expect(qLines.length).toBe(0);
  });
});