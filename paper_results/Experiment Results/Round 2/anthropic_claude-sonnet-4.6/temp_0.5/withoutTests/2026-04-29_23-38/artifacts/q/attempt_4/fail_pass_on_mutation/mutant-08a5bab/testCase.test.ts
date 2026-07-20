import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame filtering", () => {
  it("error stack should not be empty string after long stack trace processing", async () => {
    // Set BEFORE creating any promises so promise.stack gets captured
    Q.longStackSupport = true;

    let caughtError: Error | null = null;

    // Create deferred AFTER enabling longStackSupport so promise.stack is set
    const deferred = Q.defer<number>();

    // Attach rejection handler - this calls makeStackTraceLong on the error
    const p = deferred.promise.then(null, (err: Error) => {
      caughtError = err;
    });

    deferred.reject(new Error("test error"));

    await p;

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    
    // With mutation: filterStackString removes ALL lines (isInternalFrame always true
    // for lines with file:line info), so stack becomes ""
    // With original: only Q-internal frames removed, other frames remain
    // The stack property is set via object_defineProperty only if promise.stack exists
    // We need promise.stack to have been set (requires longStackSupport=true at defer() time)
    
    expect(caughtError!.stack).not.toBe("");
    expect(caughtError!.stack).toBeDefined();
    
    const atLines = (caughtError!.stack || "").split("\n")
      .filter((l: string) => l.trim().startsWith("at "));
    
    // Original: user/test frames preserved in stack
    // Mutated: all "at" frames filtered → empty array
    expect(atLines.length).toBeGreaterThan(0);
  });
});