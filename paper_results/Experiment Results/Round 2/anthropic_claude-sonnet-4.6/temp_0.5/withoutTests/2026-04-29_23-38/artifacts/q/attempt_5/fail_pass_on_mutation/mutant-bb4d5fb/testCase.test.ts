import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("filterStackString preserves non-Q file frames", async () => {
    Q.longStackSupport = true;

    let capturedError: any;

    // Create a chain so makeStackTraceLong gets triggered
    const p1 = Q.defer();
    const p2 = p1.promise.then(function step1() {
      throw new Error("chained error");
    });

    p1.resolve(1);

    await p2.fail(function catcher(e: any) {
      capturedError = e;
    });

    const stack: string = capturedError?.stack ?? "";
    
    // "step1" is a named function in this file
    // With original code: step1 frame is preserved (not in q.js)
    // With mutation: step1 frame filtered out (lineNumber <= qEndingLine ~1000)
    expect(stack).toContain("step1");
  });
});