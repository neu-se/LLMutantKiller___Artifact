import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should filter Q internal frames from long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    const deferred = Q.defer<void>();
    const chain = deferred.promise
      .then(function throwingStep() {
        throw new Error("test rejection");
      })
      .then(null, function (e: Error) {
        capturedError = e;
      });

    deferred.resolve();
    await chain;

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();

    const stack = (capturedError as Error).stack || "";

    // With longStackSupport, makeStackTraceLong concatenates promise creation
    // stacks and filters them via filterStackString -> isInternalFrame ->
    // getFileNameAndLineNumber.
    // Original: attempt1 regex matches named frames, captureLine() gets correct
    //           line numbers, isInternalFrame filters Q's own frames out.
    // Mutated:  attempt1 body is empty, getFileNameAndLineNumber returns undefined
    //           for named frames, captureLine() returns undefined, isInternalFrame
    //           always returns false, Q internal frames remain in the stack.
    expect(stack).toContain("From previous event:");

    const afterSeparator = stack.substring(
      stack.indexOf("From previous event:") + "From previous event:".length
    );

    const hasQInternalFrames =
      afterSeparator.includes("promiseDispatch") ||
      afterSeparator.includes("runSingle") ||
      afterSeparator.includes("at defer ");

    expect(hasQInternalFrames).toBe(false);
  });
});