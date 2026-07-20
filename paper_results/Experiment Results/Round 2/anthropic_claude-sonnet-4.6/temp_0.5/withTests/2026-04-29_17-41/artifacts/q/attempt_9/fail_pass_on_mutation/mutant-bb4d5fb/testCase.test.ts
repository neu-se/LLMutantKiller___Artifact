import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("longStackSupport stack modification", () => {
  it("long stack trace differs from short stack trace", async () => {
    const err = new Error("test");
    
    // Get stack without longStackSupport
    Q.longStackSupport = false;
    let shortStack = "";
    await new Promise<void>((resolve) => {
      const d = Q.defer();
      d.promise.then(null, (e: any) => { shortStack = e.stack || ""; resolve(); });
      d.reject(err);
    });

    // Reset error stack (it was modified in place)
    // Create new error for long stack test
    const err2 = new Error("test");
    
    Q.longStackSupport = true;
    let longStack = "";
    try {
      await new Promise<void>((resolve) => {
        const d = Q.defer();
        d.promise.then(null, (e: any) => { longStack = e.stack || ""; resolve(); });
        d.reject(err2);
      });
    } finally {
      Q.longStackSupport = false;
    }

    // With longStackSupport, makeStackTraceLong should modify the stack
    // The long stack should be different from the short stack
    // Specifically, it should contain "From previous event"
    expect(longStack).toContain("From previous event:");
  });
});