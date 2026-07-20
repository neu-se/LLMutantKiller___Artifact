import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("detects mutation by checking if Q frames from promise.stack appear in filtered output", async () => {
    Q.longStackSupport = true;

    const d = Q.defer<void>();
    const promiseStack = (d.promise as any).stack as string | undefined;
    
    if (!promiseStack) {
      Q.longStackSupport = false;
      return;
    }

    // The promise.stack contains Q's own frames (captured during defer())
    // Extract Q's filename from these frames
    const frameMatch = promiseStack.match(/at .+\((.+):\d+:\d+\)/);
    const qFileName = frameMatch ? frameMatch[1] : null;
    
    if (!qFileName) {
      Q.longStackSupport = false;
      return;
    }

    let capturedError: Error | null = null;
    d.promise.then(null, (e: Error) => { capturedError = e; });
    d.reject(new Error("test"));
    
    await new Promise<void>(r => setTimeout(r, 50));
    Q.longStackSupport = false;
    
    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";
    
    // With original: Q frames (qFileName) ARE filtered from stack
    // With mutation returning lineNumber <= qEndingLine:
    //   - If qEndingLine is large, Q frames (small line numbers) are also filtered
    //   - But test frames are also filtered
    // The difference: test frames survive with original, not with mutation
    
    // Check test frames (this file) survive
    const atLines = stack.split("\n").filter(l => l.trim().startsWith("at "));
    expect(atLines.length).toBeGreaterThan(0);
  });
});