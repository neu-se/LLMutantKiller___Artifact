import path from "path";
import { createRequire } from "module";

describe("getFileNameAndLineNumber attempt1 regex", () => {
  it("should use attempt1 result for named function frames with single-digit line numbers", async () => {
    const originalError = global.Error;
    
    // Get the path to q.js
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Create a mock Error that returns controlled stacks
    // The stacks contain named function frames with single-digit line numbers
    // This simulates what captureLine() would see if Q's code were at line 5
    const MockError = function(this: any, message?: string) {
      const err = Object.create(originalError.prototype);
      err.message = message ?? "";
      err.name = "Error";
      
      // Return a stack with single-digit line numbers from qPath
      // This ensures attempt1 matches and returns [qPath, 5]
      err.stack = [
        `Error${message ? ": " + message : ""}`,
        `    at someFunction (${qPath}:5:10)`,
        `    at Object.<anonymous> (${qPath}:5:10)`,
        `    at Module._compile (node:internal:1:1)`
      ].join("\n");
      
      return err;
    } as any;
    MockError.prototype = originalError.prototype;
    
    jest.resetModules();
    global.Error = MockError;
    
    let Q: any;
    let capturedError: any = null;
    
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // With original code:
      // - captureLine() parses "    at Object.<anonymous> (qPath:5:10)"
      // - attempt1 matches: returns [qPath, 5]
      // - qFileName = qPath, qStartingLine = 5, qEndingLine = 5
      //
      // With mutated code:
      // - captureLine() tries attempt1 but if(false) skips it
      // - attempt2 doesn't match (named function format)
      // - attempt3 doesn't match (no @)
      // - getFileNameAndLineNumber returns undefined
      // - captureLine returns undefined
      // - qFileName = undefined, qStartingLine = undefined
      
      Q.longStackSupport = true;
      
      // Create a deferred - promise.stack will contain qPath:5 frames
      const deferred = Q.defer();
      
      const p = deferred.promise.then(() => {
        throw new Error("deliberate error");
      });
      
      deferred.resolve(1);
      
      await p.then(null, (e: any) => { capturedError = e; });
      
    } finally {
      global.Error = originalError;
    }
    
    expect(capturedError).not.toBeNull();
    const stack = capturedError.stack ?? "";
    
    // With original: qPath:5 frames are filtered by isInternalFrame
    // With mutation: qPath:5 frames remain (isInternalFrame always returns false)
    expect(stack).not.toContain(`${qPath}:5`);
  });
});