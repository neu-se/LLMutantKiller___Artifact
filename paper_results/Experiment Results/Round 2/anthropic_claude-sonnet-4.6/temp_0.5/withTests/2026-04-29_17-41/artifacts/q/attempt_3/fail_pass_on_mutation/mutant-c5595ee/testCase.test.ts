import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import path from "path";

describe("Firefox-style stack trace parsing", () => {
  it("correctly parses stack lines with multiple characters before @ when filtering long stack traces", () => {
    Q.longStackSupport = true;

    const qFilePath: string = (require as NodeRequire).resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Build a Firefox-style stack line where the function name has multiple chars before @
    // Original regex /.*@/ matches this; mutated regex /.@/ does NOT (needs exactly 1 char)
    const multiCharFunctionName = "someQInternalFunction";
    const firefoxStyleLine = `${multiCharFunctionName}@${qFilePath}:500`;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Override the promise stack with our Firefox-style line
    // so makeStackTraceLong will process it through filterStackString
    (promise as any).stack = firefoxStyleLine;

    const err = new Error("sentinel");
    err.stack = `Error: sentinel\n    at Object.<anonymous> (/some/test/file.js:1:1)`;

    deferred.reject(err);

    return promise.catch((e: Error) => {
      Q.longStackSupport = false;

      // With original /.*@/: the Firefox line is parsed -> isInternalFrame checks it
      //   -> if qFileName matches and line 500 is in range, it's filtered OUT
      // With mutated /.@/: the Firefox line is NOT parsed -> isInternalFrame returns false
      //   -> line stays IN the stack
      //
      // Either way, we can observe: with original, attempt3 parses the line.
      // The key observable: does the stack contain our Firefox line or not?
      //
      // But we need qFileName to match qFilePath for the frame to be "internal".
      // Let's verify by checking the stack content.
      expect(e.stack).not.toContain(multiCharFunctionName);
    });
  });
});