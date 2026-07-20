import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Firefox-style stack frame filtering", () => {
  it("should filter internal Q frames identified via Firefox-style stack syntax in long stack traces", async () => {
    Q.longStackSupport = true;

    // In Jest/CommonJS, require is available globally
    const qPath: string = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    const deferred = Q.defer();

    // Override the promise's stack with a Firefox-style frame pointing to q.js line 500.
    // Line 500 should be within [qStartingLine, qEndingLine] inside Q.
    // Firefox-style format: "functionName@filename:lineNumber"
    const internalFrame = `someQInternalFunction@${qPath}:500`;
    deferred.promise.stack = internalFrame;

    const error = new Error("test rejection");
    error.stack = "Error: test rejection\n    at Object.<anonymous> (/test/file.js:1:1)";

    let capturedError: any;
    const resultPromise = deferred.promise.then(null, (e: any) => {
      capturedError = e;
      return "handled";
    });

    deferred.reject(error);
    await resultPromise;

    expect(capturedError).toBeDefined();

    const finalStack: string = capturedError.stack ?? "";

    // With original \d+: attempt3 regex /.*@(.+):(\d+)$/ matches "someQInternalFunction@qPath:500"
    //   getFileNameAndLineNumber returns [qPath, 500]
    //   isInternalFrame returns true (qPath === qFileName, 500 in valid range)
    //   → frame is filtered OUT of the stack
    //   → finalStack does NOT contain internalFrame  ✓ test passes
    //
    // With mutated \D+: attempt3 regex /.*@(.+):(\D+)$/ does NOT match ":500" (digits)
    //   getFileNameAndLineNumber returns undefined
    //   isInternalFrame returns false → frame is NOT filtered
    //   → finalStack CONTAINS internalFrame  ✗ test fails
    expect(finalStack).not.toContain(internalFrame);

    Q.longStackSupport = false;
  });
});