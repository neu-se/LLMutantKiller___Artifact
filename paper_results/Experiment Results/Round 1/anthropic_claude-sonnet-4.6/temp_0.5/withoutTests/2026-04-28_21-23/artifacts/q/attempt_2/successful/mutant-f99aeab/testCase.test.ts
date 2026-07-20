import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q captureLine", () => {
  it("captureLine sets qFileName enabling internal frame filtering in long stack traces", async () => {
    Q.longStackSupport = true;

    const qModulePath = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // First, verify that q.js frames DO appear in a raw stack trace
    // (so we know filtering has something to work with)
    let rawQFrames: string[] = [];
    try {
      throw new Error("raw");
    } catch (e: any) {
      // This won't have q.js frames, but promise.stack will
    }

    let caughtError: Error | null = null;
    let promiseStack: string | undefined;

    const d = Q.defer();
    // Capture the promise's stack (set when defer() is called inside q.js)
    promiseStack = (d.promise as any).stack;

    d.promise
      .then(() => {
        throw new Error("test");
      })
      .fail((e: Error) => {
        caughtError = e;
      });

    d.resolve(1);
    await new Promise(r => setTimeout(r, 50));

    expect(caughtError).not.toBeNull();
    
    // The promise.stack should contain q.js frames
    expect(promiseStack).toBeDefined();
    const promiseStackLines = (promiseStack || "").split("\n");
    const qFramesInPromiseStack = promiseStackLines.filter((line: string) =>
      line.includes(qModulePath)
    );
    // Verify q.js frames ARE in the promise stack (so filtering has something to do)
    expect(qFramesInPromiseStack.length).toBeGreaterThan(0);

    // Now check the error's stack after makeStackTraceLong ran
    const errorStack = caughtError!.stack || "";
    expect(errorStack).toContain("From previous event:");
    
    const errorStackLines = errorStack.split("\n").slice(1);
    const qFramesInErrorStack = errorStackLines.filter((line: string) =>
      line.includes(qModulePath)
    );

    // Original: qFileName set → isInternalFrame works → q.js frames filtered out
    // Mutated: qFileName undefined → isInternalFrame always false → q.js frames remain
    expect(qFramesInErrorStack.length).toBe(0);

    Q.longStackSupport = false;
  });
});