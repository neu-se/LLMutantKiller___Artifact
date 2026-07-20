import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isInternalFrame >= boundary", () => {
  it("should filter all q.js frames from long stack traces including those at qStartingLine", async () => {
    Q.longStackSupport = true;

    // Capture promise.stack before filtering to verify it contains q.js frames
    const deferred = Q.defer();
    const promiseStack: string = (deferred.promise as any).stack || "";
    
    // Verify promise.stack has q.js frames (they should be there before filtering)
    expect(promiseStack.split("\n").some((l: string) => /q\.js:\d+/.test(l))).toBe(true);
    
    // Now trigger a rejection to exercise makeStackTraceLong + filterStackString
    let capturedError: Error | null = null;
    await new Promise<void>((resolve) => {
      deferred.promise
        .then(() => { throw new Error("rejection test"); })
        .fail((e: Error) => {
          capturedError = e;
          resolve();
        });
      deferred.resolve(1);
    });

    expect(capturedError).not.toBeNull();
    const filteredStack = capturedError!.stack!;
    
    // Long stack should be present
    expect(filteredStack).toContain("From previous event:");
    
    // After filtering, NO q.js frames should remain
    // With >= (original): frame at qStartingLine IS filtered → 0 q.js frames
    // With > (mutant): frame at qStartingLine NOT filtered → potentially >0 q.js frames
    const qFramesInFiltered = filteredStack.split("\n").filter((l: string) => /q\.js:\d+/.test(l));
    expect(qFramesInFiltered).toHaveLength(0);
  });
});