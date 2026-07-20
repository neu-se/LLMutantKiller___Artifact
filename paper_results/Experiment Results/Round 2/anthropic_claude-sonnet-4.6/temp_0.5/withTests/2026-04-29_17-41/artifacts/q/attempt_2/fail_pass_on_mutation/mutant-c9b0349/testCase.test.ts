import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound", () => {
  it("should not filter q.js frames at lines before qStartingLine", () => {
    Q.longStackSupport = true;

    // Create an error with a custom stack that includes a q.js frame at line 50
    // (which is before qStartingLine ~63)
    const customError = new Error("test error");
    
    // We need to know the actual q.js file path
    // We can get it by looking at the stack of a Q-created error
    const testDeferred = Q.defer();
    
    // The promise.stack will contain the q.js file path
    // We'll use it to create a custom stack
    const qFilePath = testDeferred.promise.stack
      ? testDeferred.promise.stack.split("\n")
          .find((line: string) => line.includes("q.js") || line.includes("q.ts"))
          ?.match(/\((.+?):\d+:\d+\)/)?.[1]
      : null;
    
    if (!qFilePath) {
      // Can't determine q.js path, skip test
      Q.longStackSupport = false;
      return;
    }
    
    // Create a custom stack with a q.js frame at line 50 (before qStartingLine)
    customError.stack = `Error: test error\n    at Object.<anonymous> (${qFilePath}:50:1)\n    at userCode (test.ts:10:1)`;
    
    const p = Q.reject(customError).fail((err: Error) => {
      Q.longStackSupport = false;
      const stack = err.stack || "";
      // Original: q.js:50 is NOT filtered (50 < qStartingLine)
      // Mutation: q.js:50 IS filtered (true && 50 <= qEndingLine)
      expect(stack).toContain(`${qFilePath}:50`);
      return null;
    });
    
    return p;
  });
});