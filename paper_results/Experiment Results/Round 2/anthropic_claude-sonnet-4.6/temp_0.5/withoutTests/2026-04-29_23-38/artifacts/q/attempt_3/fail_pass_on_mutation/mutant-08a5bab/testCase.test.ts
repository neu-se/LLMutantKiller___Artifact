import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame filtering", () => {
  it("stack trace after long stack processing should not be empty", async () => {
    Q.longStackSupport = true;

    let caughtError: Error | null = null;

    // Create a deferred rejection that goes through _rejected in .then()
    // which calls makeStackTraceLong, which calls filterStackString
    const deferred = Q.defer<number>();

    const promise = deferred.promise.then(
      null,
      function myRejectionHandler(err: Error) {
        caughtError = err;
        return Q.resolve(0);
      }
    );

    deferred.reject(new Error("test error for stack filtering"));

    await promise;

    expect(caughtError).not.toBeNull();
    
    // With original: filterStackString only removes Q-internal frames
    // The error message line ("Error: test error...") is NOT an internal frame
    // because getFileNameAndLineNumber returns null for it (no file:line pattern)
    // so isInternalFrame returns false → line is kept
    //
    // With mutation: isInternalFrame returns true for ALL lines
    // BUT lines where getFileNameAndLineNumber returns null → isInternalFrame returns false
    // Wait... let me re-read isInternalFrame:
    // if (!fileNameAndLineNumber) { return false; }
    // So lines without file:line info return false even with mutation!
    // The mutation only affects lines WHERE fileNameAndLineNumber is found.
    
    // Hmm, so the error message line "Error: test error" has no file:line,
    // getFileNameAndLineNumber returns undefined, isInternalFrame returns false → kept
    // But AT lines with file:line ARE filtered with mutation
    
    // So with mutation: only the "Error: test error" line remains (no at-frames)
    // With original: "Error: test error" + user at-frames remain
    
    const stack = caughtError!.stack || "";
    const atLines = stack.split("\n").filter((line: string) => line.trim().startsWith("at "));
    
    // Original: user "at" lines are preserved
    // Mutated: ALL "at" lines are filtered out (isInternalFrame returns true for them)
    expect(atLines.length).toBeGreaterThan(0);

    Q.longStackSupport = false;
  });
});