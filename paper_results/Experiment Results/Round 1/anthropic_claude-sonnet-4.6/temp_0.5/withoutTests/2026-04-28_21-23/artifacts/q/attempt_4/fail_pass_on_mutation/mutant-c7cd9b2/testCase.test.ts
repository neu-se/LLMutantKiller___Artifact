import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should correctly parse anonymous stack frames for internal frame filtering", async () => {
    Q.longStackSupport = true;
    
    // Create a promise chain that generates promise.stack with Q internal frames
    const p = Q.when(1)
      .then((v: number) => Q.when(v + 1))
      .then((v: number) => { throw new Error("test error at " + v); });
    
    const err = await p.then(null, (e: Error) => e);
    const stack = err.stack || "";
    
    // The stack should contain the "From previous event:" separator
    // This indicates makeStackTraceLong ran and processed promise.stack values
    expect(stack).toContain("From previous event:");
    
    // Q internal frames should NOT appear in the filtered stack
    // If attempt2 is needed for captureLine and is disabled (mutation),
    // qFileName will be undefined, isInternalFrame always returns false,
    // and Q internal frames will appear in the stack
    const hasQInternalFrame = stack.split("\n").some((line: string) => {
      // Check for Q internal frames: lines from q.js that are internal
      return /\bq\.js:\d+:\d\b/.test(line) || /\bq\.js:\d+:\d+\b/.test(line);
    });
    
    // In original: Q frames filtered, so no q.js frames should appear
    // In mutated: Q frames not filtered (if attempt2 needed), q.js frames appear
    expect(hasQInternalFrame).toBe(false);
  });
});