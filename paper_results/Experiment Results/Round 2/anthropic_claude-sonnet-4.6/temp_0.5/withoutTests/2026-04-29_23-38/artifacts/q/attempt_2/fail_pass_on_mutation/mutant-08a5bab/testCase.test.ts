import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame stack filtering", () => {
  it("should preserve non-Q stack frames when long stack support filters internal frames", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function outerUserFunction(): Q.Promise<never> {
      const deferred = Q.defer<never>();
      Q.nextTick(function innerUserFunction() {
        deferred.reject(new Error("rejection from user code"));
      });
      return deferred.promise;
    }

    await new Promise<void>((resolve) => {
      outerUserFunction()
        .then(null, function rejectionHandler(err: Error) {
          capturedError = err;
          resolve();
        });
    });

    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";

    // With original: only Q-internal frames are filtered, user frames remain
    // With mutation: ALL frames are filtered (isInternalFrame always returns true),
    // leaving an empty string after filtering
    expect(stack.trim()).not.toBe("");
    
    // The stack should contain at least the error message line and one frame
    const lines = stack.split("\n").filter((l: string) => l.trim() !== "");
    expect(lines.length).toBeGreaterThan(1);

    Q.longStackSupport = false;
  });
});