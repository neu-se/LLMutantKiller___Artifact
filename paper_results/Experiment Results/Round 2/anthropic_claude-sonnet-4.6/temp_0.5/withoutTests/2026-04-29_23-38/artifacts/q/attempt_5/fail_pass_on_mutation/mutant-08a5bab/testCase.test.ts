import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("should return false for frames outside Q file, preserving them in filtered stacks", async () => {
    Q.longStackSupport = true;

    let capturedError: any = null;

    // Create a chain: deferred -> then (throws) -> catch
    // The "then" promise has .stack set (created while longStackSupport=true)
    // When the throw propagates, makeStackTraceLong is called with:
    //   - error: the thrown Error  
    //   - self: the promise from .then() which has .stack set
    const d = Q.defer<number>();
    
    const p = d.promise
      .then((_val: number) => {
        throw new Error("THROWN_IN_THEN");
      })
      .then(null, (e: Error) => {
        capturedError = e;
      });

    d.resolve(42);
    await p;

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    
    const stack: string = capturedError.stack || "";
    
    // With original isInternalFrame: only Q's own file frames are filtered
    // Frames from this test file have a different fileName than qFileName → preserved
    // With mutated isInternalFrame (always true): ALL frames with file:line filtered
    // leaving only lines where getFileNameAndLineNumber returns null/undefined
    
    // Check that "at" frames exist (they would be from this test file)
    const atFrames = stack.split("\n").filter((l: string) => l.trim().startsWith("at "));
    expect(atFrames.length).toBeGreaterThan(0);
  });
});