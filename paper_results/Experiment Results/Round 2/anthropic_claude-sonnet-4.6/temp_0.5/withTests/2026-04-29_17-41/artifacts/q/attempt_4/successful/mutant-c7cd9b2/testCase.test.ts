import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 pattern detection", () => {
  it("should parse anonymous stack frames to enable Q internal frame filtering", async () => {
    // Force anonymous frames to use attempt2 format (single-digit column)
    const originalPrepare = (Error as any).prepareStackTrace;
    
    (Error as any).prepareStackTrace = function(err: any, frames: any[]) {
      const lines = ["Error: " + (err.message || "")];
      for (const frame of frames) {
        const fn = frame.getFunctionName();
        const file = frame.getFileName() || "<anonymous>";
        const line = frame.getLineNumber() || 0;
        const col = frame.getColumnNumber() || 0;
        if (fn) {
          lines.push(`    at ${fn} (${file}:${line}:${col})`);
        } else {
          // Force single-digit column for anonymous frames -> attempt2 format
          lines.push(`    at ${file}:${line}:1`);
        }
      }
      return lines.join("\n");
    };
    
    Q.longStackSupport = true;
    
    let errorStack = "";
    
    const deferred = Q.defer();
    const promise = deferred.promise.then(function namedUserFunction() {
      throw new Error("test error");
    });
    
    await new Promise<void>((resolve) => {
      promise.fail(function(err: any) {
        errorStack = err.stack || "";
        resolve();
      });
      deferred.resolve(42);
    });
    
    Q.longStackSupport = false;
    (Error as any).prepareStackTrace = originalPrepare;
    
    expect(errorStack).toContain("namedUserFunction");
    
    // With original code: attempt2 matches anonymous Q frames (formatted as "at q.js:LINE:1")
    // isInternalFrame returns true for them -> they are filtered out
    // With mutated code: attempt2 disabled -> getFileNameAndLineNumber returns undefined
    // for these frames -> isInternalFrame returns false -> frames NOT filtered
    
    const lines = errorStack.split("\n");
    const anonymousQFrames = lines.filter((line: string) =>
      /^\s+at [^\s(].*q\.js:\d+:1$/.test(line)
    );
    
    expect(anonymousQFrames.length).toBe(0);
  });
});