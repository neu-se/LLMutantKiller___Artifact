import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should correctly handle promise rejection without crashing when processing stack traces", async () => {
    // The mutation changes `if (attempt3)` to `if (true)` in getFileNameAndLineNumber
    // This causes a crash when attempt3 is null (no regex match)
    // isInternalFrame calls getFileNameAndLineNumber for each stack line
    // filterStackString calls isInternalFrame
    // makeStackTraceLong calls filterStackString
    // makeStackTraceLong is called during promise rejection handling
    
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    
    let result: string | null = null;
    await deferred.promise.then(null, (err: Error) => {
      result = err.message;
    });
    
    expect(result).toBe("test error");
  });
});