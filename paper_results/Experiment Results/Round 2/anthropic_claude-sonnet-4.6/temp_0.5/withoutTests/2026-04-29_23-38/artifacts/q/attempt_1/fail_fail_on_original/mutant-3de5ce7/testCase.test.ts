import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";

describe("Q Firefox stack trace regex", () => {
  it("should filter Q-internal Firefox-style stack frames when line numbers are numeric", async () => {
    Q.longStackSupport = true;
    
    // Get Q's absolute file path (same as qFileName)
    const require = createRequire(import.meta.url);
    const qFilePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Create an error with a Firefox-style stack that includes a line from Q's internal code
    // Line 500 should be well within Q's internal range
    const internalLineNumber = 500;
    const error = new Error("test error");
    const qInternalFirefoxLine = `someQFunction@${qFilePath}:${internalLineNumber}`;
    const externalFirefoxLine = `userFunction@/user/code.js:10`;
    
    Object.defineProperty(error, 'stack', {
      value: `Error: test error\n${qInternalFirefoxLine}\n${externalFirefoxLine}`,
      writable: true,
      configurable: true
    });
    
    let resultError: any = null;
    
    // Create a deferred to get a promise with a stack
    const deferred = Q.defer();
    
    const resultPromise = deferred.promise.then(null, (e: any) => {
      resultError = e;
    });
    
    deferred.reject(error);
    
    await resultPromise;
    
    expect(resultError).not.toBeNull();
    
    // With original code (\d+): 
    //   - Firefox-style line "someQFunction@q.js:500" is parsed correctly
    //   - getFileNameAndLineNumber returns [qFilePath, 500]
    //   - isInternalFrame returns true (it's Q's file, within range)
    //   - The line is FILTERED OUT of the stack
    //   - resultError.stack should NOT contain the Q internal line
    //
    // With mutated code (\D+):
    //   - Firefox-style line "someQFunction@q.js:500" fails to match (\D+ won't match "500")
    //   - getFileNameAndLineNumber returns undefined for this line
    //   - isInternalFrame returns false
    //   - The line is NOT filtered out
    //   - resultError.stack SHOULD contain the Q internal line
    
    const stackContainsQInternalLine = resultError.stack && 
      resultError.stack.includes(`${qFilePath}:${internalLineNumber}`);
    
    // Original: Q internal line is filtered, so it should NOT be in the stack
    expect(stackContainsQInternalLine).toBe(false);
    
    Q.longStackSupport = false;
  });
});