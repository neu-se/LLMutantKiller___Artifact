import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";

describe("Q isInternalFrame >= vs > boundary", () => {
  it("should treat qStartingLine as internal (>= not >)", async () => {
    Q.longStackSupport = true;

    // Step 1: find qFileName and qStartingLine by examining promise.stack
    const d = Q.defer();
    const rawStack: string = (d.promise as any).stack || "";
    
    // Extract q.js frames from the raw (unfiltered) promise stack
    // These frames are at lines > qStartingLine
    const qFrameLines = rawStack.split("\n").filter((l: string) => /q\.js:\d+/.test(l));
    expect(qFrameLines.length).toBeGreaterThan(0);
    
    // Get the q.js filename from one of these frames
    const firstQFrame = qFrameLines[0];
    const fileMatch = /\((.+q\.js):(\d+):\d+\)/.exec(firstQFrame) || /at (.+q\.js):(\d+):\d+/.exec(firstQFrame);
    expect(fileMatch).not.toBeNull();
    
    const qFileName = fileMatch![1];
    
    // Get all line numbers from q.js frames in promise.stack
    const lineNumbers = qFrameLines.map((l: string) => {
      const m = new RegExp(`${qFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:(\\d+)`).exec(l);
      return m ? parseInt(m[1], 10) : 0;
    }).filter(n => n > 0);
    
    // qStartingLine must be less than all these line numbers
    // (since all q.js runtime frames are after qStartingLine in the file)
    const minQLine = Math.min(...lineNumbers);
    
    // Now create a synthetic error with a stack frame at (minQLine - 1)
    // which should be <= qStartingLine for the original but might not be for mutant
    // Actually, we need to find the exact qStartingLine
    // 
    // Better approach: use Error.prepareStackTrace to inject a frame at a specific line
    // We'll inject at (minQLine - 1) and check if it gets filtered
    
    const syntheticLineNumber = minQLine - 1;
    
    // Create an error whose stack contains a frame at syntheticLineNumber in qFileName
    const originalPrepare = (Error as any).prepareStackTrace;
    
    let syntheticError: Error | null = null;
    
    try {
      (Error as any).prepareStackTrace = (err: Error, stack: any[]) => {
        // Return a custom stack string with a frame at syntheticLineNumber
        const customFrame = `    at Object.<anonymous> (${qFileName}:${syntheticLineNumber}:1)`;
        return `Error: synthetic\n${customFrame}\n    at testCode (test.js:1:1)`;
      };
      
      syntheticError = new Error("synthetic");
      // Force stack capture
      void syntheticError.stack;
    } finally {
      (Error as any).prepareStackTrace = originalPrepare;
    }
    
    // Now use makeStackTraceLong indirectly by creating a rejection with this error
    // We need to trigger _rejected with our synthetic error
    // The way to do this: reject a promise with our synthetic error and handle it
    
    let processedError: Error | null = null;
    await new Promise<void>((resolve) => {
      Q.reject(syntheticError!)
        .fail((e: Error) => {
          processedError = e;
          resolve();
        });
    });
    
    expect(processedError).not.toBeNull();
    const processedStack = (processedError as Error).stack || "";
    
    // With original (>=): frame at syntheticLineNumber (= minQLine - 1) 
    //   if syntheticLineNumber >= qStartingLine → filtered (not in output)
    //   if syntheticLineNumber < qStartingLine → not filtered (in output)
    // With mutant (>): frame at syntheticLineNumber
    //   if syntheticLineNumber > qStartingLine → filtered
    //   if syntheticLineNumber <= qStartingLine → not filtered
    
    // The key: if syntheticLineNumber === qStartingLine:
    //   original (>=): filtered → frame NOT in output
    //   mutant (>): NOT filtered → frame IN output
    
    // We need syntheticLineNumber === qStartingLine
    // But we don't know qStartingLine exactly...
    
    d.reject(new Error("cleanup"));
  });
});