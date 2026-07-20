import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("detects mutation by checking stack frame filtering boundary", () => {
    Q.longStackSupport = true;

    // We need to find a frame that is below qStartingLine.
    // qStartingLine is the line in q.js where `var qStartingLine = captureLine()` is called.
    // In q.js that's around line 85.
    // The promise.stack at defer() creation includes the call site in THIS file.
    // We create two deferreds at different lines and check which one's frame survives filtering.

    const d1 = Q.defer(); // line 10 - should be < qStartingLine
    const d2 = Q.defer(); // line 11 - should be < qStartingLine

    // Chain: d1 resolves to d2, d2 rejects
    const p = d1.promise
      .then(() => d2.promise)
      .then(null, (err: Error) => {
        Q.longStackSupport = false;
        const stack = err.stack || "";
        // The stack should contain "From previous event:" if makeStackTraceLong ran
        // After filtering, frames from this test file at lines < qStartingLine should survive
        // in original but be removed in mutated
        expect(stack).toContain("From previous event:");
        // The content after the separator should be non-trivial
        const parts = stack.split("From previous event:");
        const afterSep = parts[parts.length - 1] || "";
        expect(afterSep.trim()).not.toBe("");
      });

    d1.resolve();
    d2.reject(new Error("test"));
    return p;
  });
});