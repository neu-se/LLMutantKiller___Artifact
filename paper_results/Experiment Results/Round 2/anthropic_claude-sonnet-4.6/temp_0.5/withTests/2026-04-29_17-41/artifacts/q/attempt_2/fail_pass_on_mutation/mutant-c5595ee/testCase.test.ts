import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import path from "path";

describe("long stack trace filtering with Firefox-style stacks", () => {
  it("filters Q-internal Firefox-style frames with multi-char function names", () => {
    Q.longStackSupport = true;

    // We need to know Q's filename and a line number within its range
    // We can get the filename from a V8 stack trace of a Q function
    // Then craft a Firefox-style line with that filename
    
    let qFileName: string | undefined;
    let qLineNumber: number | undefined;
    
    // Capture a stack trace from within Q's execution
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // The promise.stack was set by Q when longStackSupport=true
    // It's in V8 format, parse it to get Q's filename
    if (promise.stack) {
      const lines = promise.stack.split('\n');
      for (const line of lines) {
        const match = /at .+ \((.+):(\d+):\d+\)$/.exec(line);
        if (match && match[1].includes('q.js')) {
          qFileName = match[1];
          qLineNumber = parseInt(match[2]);
          break;
        }
      }
    }
    
    if (!qFileName || !qLineNumber) {
      Q.longStackSupport = false;
      // Can't test without Q's filename, skip
      return Promise.resolve();
    }
    
    // Now create a Firefox-style stack line that looks like a Q internal frame
    // "qInternal" has multiple chars before @, so:
    // - Original /.*@/: parses it -> isInternalFrame can return true -> filtered OUT
    // - Mutated /.@/: fails to parse -> isInternalFrame returns false -> stays IN
    const firefoxInternalLine = `qInternalFunction@${qFileName}:${qLineNumber}`;
    
    const deferred2 = Q.defer();
    const promise2 = deferred2.promise;
    promise2.stack = firefoxInternalLine;
    promise2.stackCounter = 999; // high counter so it's included
    
    const err = new Error("test");
    err.stack = "Error: test\n    at myCode (/app/test.js:1:1)";
    
    deferred2.reject(err);
    
    return promise2.catch((e: Error) => {
      Q.longStackSupport = false;
      // With original: firefoxInternalLine gets filtered (not in e.stack)
      // With mutated: firefoxInternalLine stays (in e.stack)
      if (e.stack) {
        // Original: internal frame filtered out
        // Mutated: internal frame present
        const hasInternalFrame = e.stack.includes('qInternalFunction');
        expect(hasInternalFrame).toBe(false); // should be filtered
      }
    });
  });
});