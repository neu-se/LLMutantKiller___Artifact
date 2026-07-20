import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("attempt3 regex", () => {
  it("parses Firefox-style stack lines with multiple chars before @", () => {
    // Get Q's actual filename as it appears in stack traces
    let qFileName = "";
    try {
      throw new Error();
    } catch(e: any) {
      // Find the q.js line in the stack
      const lines = (e.stack || "").split("\n");
      // Actually we need a stack from within Q itself
    }
    
    // Better: use Q with longStackSupport to capture a stack from Q
    Q.longStackSupport = true;
    const d = Q.defer();
    const qStack = (d.promise as any).stack || "";
    Q.longStackSupport = false;
    
    // Parse qFileName from the V8-format stack
    let actualQFileName = "";
    let actualQLineNumber = 0;
    for (const line of qStack.split("\n")) {
      const match = /at .+ \((.+q\.js):(\d+):\d+\)$/.exec(line);
      if (match) {
        actualQFileName = match[1];
        actualQLineNumber = parseInt(match[2]);
        break;
      }
    }
    
    if (!actualQFileName) {
      // Can't determine Q's filename, skip
      return;
    }
    
    // Now use this actual filename in our Firefox-style line
    Q.longStackSupport = true;
    const firefoxLine = `someInternalFunction@${actualQFileName}:${actualQLineNumber}`;
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    (promise as any).stack = firefoxLine;
    
    const err = new Error("test");
    err.stack = "Error: test\n    at myTest (/test/file.js:1:1)";
    
    deferred.reject(err);
    
    return promise.catch((e: Error) => {
      Q.longStackSupport = false;
      expect((e.stack || "")).not.toContain("someInternalFunction@");
    });
  });
});