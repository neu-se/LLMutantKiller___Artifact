import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering with attempt2 regex", () => {
  it("correctly parses stack frames with multi-digit column numbers for internal frame detection", async () => {
    // Override Error.prepareStackTrace to produce attempt2 format frames
    // (no function name, no parentheses) - this is the format that attempt2 handles
    const originalPrepareStackTrace = (Error as any).prepareStackTrace;
    
    (Error as any).prepareStackTrace = function(err: Error, structuredStackTrace: any[]) {
      const frames = structuredStackTrace.map((frame: any) => {
        const fileName = frame.getFileName() || "";
        const lineNumber = frame.getLineNumber() || 0;
        const columnNumber = frame.getColumnNumber() || 0;
        // Produce attempt2 format: "at filename:line:col" (no function name, no parens)
        return `    at ${fileName}:${lineNumber}:${columnNumber}`;
      });
      return `Error\n${frames.join("\n")}`;
    };
    
    // Reload Q so that captureLine() runs with the attempt2 format stack
    // This is critical: captureLine sets qStartingLine and qFileName
    jest.resetModules();
    const QReloaded = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    
    // Restore original prepareStackTrace
    (Error as any).prepareStackTrace = originalPrepareStackTrace;
    
    // Now test Q's long stack trace filtering
    QReloaded.longStackSupport = true;
    
    const stack = await new Promise<string>((resolve) => {
      const deferred = QReloaded.defer();
      
      deferred.promise.catch(function(err: any) {
        QReloaded.longStackSupport = false;
        resolve(err.stack || "");
      });
      
      deferred.reject(new Error("test"));
    });
    
    // With original code: captureLine correctly parsed the attempt2 frame
    // (column 21 for "var qStartingLine = captureLine()") → qFileName is set
    // → isInternalFrame works → Q frames are filtered → no q.js in stack
    
    // With mutated code: captureLine failed to parse (column 21 is 2 digits)
    // → qFileName is undefined → isInternalFrame always false
    // → Q frames NOT filtered → q.js appears in stack
    
    const frameLines = stack.split("\n").filter((l: string) => /^\s+at\s/.test(l));
    const qFrames = frameLines.filter((f: string) => /q\.js/.test(f));
    expect(qFrames.length).toBe(0);
  });
});