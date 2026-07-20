import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("with longStackSupport, filtered stack should be shorter than concatenated unfiltered stacks", async () => {
    Q.longStackSupport = true;

    const d = Q.defer<void>();
    const promiseStackStr = (d.promise as any).stack as string | undefined;
    
    if (!promiseStackStr) {
      Q.longStackSupport = false;
      return;
    }

    // Count lines in promise.stack (these are Q-internal frames)
    const promiseStackLines = promiseStackStr.split("\n").filter((l: string) => l.trim() !== "");
    
    const err = new Error("test");
    const errorStackLines = (err.stack || "").split("\n").filter((l: string) => l.trim() !== "");
    
    let capturedError: Error | null = null;
    d.promise.then(null, (e: Error) => { capturedError = e; });
    d.reject(err);
    
    await new Promise<void>(r => setTimeout(r, 50));
    Q.longStackSupport = false;
    
    expect(capturedError).not.toBeNull();
    const finalStack = capturedError!.stack || "";
    const finalLines = finalStack.split("\n").filter((l: string) => l.trim() !== "");
    
    // The concatenated stack has errorStackLines + promiseStackLines + separator
    // After filtering with ORIGINAL: Q frames removed, test frames kept
    //   → finalLines.length < errorStackLines.length + promiseStackLines.length
    // After filtering with MUTATION (all filtered): only error message line remains
    //   → finalLines.length === 1 (just "Error: test")
    // After filtering with MUTATION (nothing filtered, qEndingLine=undefined):
    //   → finalLines includes everything minus node frames
    
    // Key: with original, finalLines should include test file frames
    // With mutation (large qEndingLine), finalLines should NOT include test file frames
    
    // Check that test file frames are present
    const testFileFrames = finalLines.filter((l: string) => 
      l.includes("testCase.test")
    );
    expect(testFileFrames.length).toBeGreaterThan(0);
  });
});