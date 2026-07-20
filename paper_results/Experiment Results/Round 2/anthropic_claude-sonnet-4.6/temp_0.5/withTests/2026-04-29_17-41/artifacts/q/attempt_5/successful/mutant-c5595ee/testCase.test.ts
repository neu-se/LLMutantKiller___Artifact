import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("attempt3 regex in getFileNameAndLineNumber", () => {
  it("parses Firefox-style anonymous stack lines with zero characters before @", () => {
    Q.longStackSupport = true;

    // Get Q's actual filename from a real Q stack trace
    const d0 = Q.defer();
    const qStack: string = (d0.promise as any).stack || "";
    
    let qFileName = "";
    let qLineNum = 0;
    for (const line of qStack.split("\n")) {
      const m = /^\s*at\s+\S+\s+\((.+):(\d+):\d+\)\s*$/.exec(line);
      if (m) {
        qFileName = m[1];
        qLineNum = parseInt(m[2]);
        break;
      }
    }
    
    if (!qFileName) {
      Q.longStackSupport = false;
      return; // Can't test
    }

    // Anonymous Firefox-style line: "@filename:line" (0 chars before @)
    const anonymousLine = `@${qFileName}:${qLineNum}`;

    const deferred = Q.defer();
    const promise = deferred.promise;
    (promise as any).stack = anonymousLine;

    // Use plain object to avoid Error.stack configurability issues
    const errObj = {
      stack: `Error: test\n    at myTest (/test.js:1:1)\n${anonymousLine}`,
      message: "test"
    };

    deferred.reject(errObj);

    return promise.catch((e: any) => {
      Q.longStackSupport = false;
      const stack = (e && e.stack) || "";
      // Original: anonymousLine parsed → isInternalFrame = true → filtered OUT
      // Mutated: anonymousLine not parsed → isInternalFrame = false → stays IN
      expect(stack).not.toContain(anonymousLine);
    });
  });
});