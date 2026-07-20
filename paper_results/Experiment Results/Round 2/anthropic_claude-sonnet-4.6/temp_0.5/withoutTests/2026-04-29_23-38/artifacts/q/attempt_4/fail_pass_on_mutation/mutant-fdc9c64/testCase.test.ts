import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("long stack support works and preserves user frames", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      const d = Q.defer<void>();
      d.promise.then(null, function(err: Error) {
        capturedError = err;
        resolve();
      });
      d.reject(new Error("test"));
    });

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack!;
    
    // Verify makeStackTraceLong ran
    expect(stack).toContain("From previous event:");
    
    // With original: user frames preserved after filtering
    // With mutation: user frames filtered (lineNumber <= qEndingLine)
    const lines = stack.split("\n");
    const frameLines = lines.filter(l => /\s+at\s/.test(l));
    expect(frameLines.length).toBeGreaterThan(0);

    Q.longStackSupport = false;
  });
});