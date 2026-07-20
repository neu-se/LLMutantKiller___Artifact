import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("should correctly identify internal frames by filename not just line number", async () => {
    Q.longStackSupport = true;

    // We need to verify filterStackString behavior
    // The mutation makes isInternalFrame return true for ANY file at lineNumber <= qEndingLine
    // qEndingLine is ~1000 (end of q.js)
    // So frames from this test file (which has few lines) would all be filtered
    
    let capturedError: any;
    
    // Create a promise chain with multiple steps to trigger makeStackTraceLong
    const result = Q(1)
      .then(function firstStep(v: number) { return v + 1; })
      .then(function secondStep(v: number) { throw new Error("error in secondStep"); });

    await result.fail(function(e: any) {
      capturedError = e;
    });

    const stack: string = capturedError?.stack ?? "";
    
    // With original: "secondStep" frame preserved (it's in this file, not q.js)
    // With mutation: "secondStep" frame filtered (lineNumber < ~1000)
    expect(stack).toContain("secondStep");
  });
});