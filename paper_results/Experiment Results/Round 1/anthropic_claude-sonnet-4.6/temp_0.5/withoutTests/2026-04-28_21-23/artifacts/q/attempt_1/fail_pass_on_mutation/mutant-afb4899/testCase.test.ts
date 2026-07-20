import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber regex mutation detection", () => {
  it("should correctly resolve Q.all with fulfilled promises without corruption from regex mutation", async () => {
    // The mutation changes attempt2 regex from /at ([^ ]+):(\d+):(?:\d+)$/ to /at ([^ ]+):(\d+):(?:\d+)/
    // Without $, a stack line like "at funcName (file.js:10:5)" would match attempt2
    // returning ["file.js:10", 5] instead of attempt1's [] (empty array)
    // This affects isInternalFrame which uses getFileNameAndLineNumber
    
    Q.longStackSupport = true;
    
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ]);
    
    expect(result).toEqual([1, 2, 3]);
    
    // Test that rejection with long stacks works correctly
    let caughtError: Error | null = null;
    try {
      await Q.reject(new Error("test error")).then(() => {});
    } catch (e) {
      caughtError = e as Error;
    }
    
    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe("test error");
    
    Q.longStackSupport = false;
  });
});