import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";
import { fileURLToPath } from "url";

describe("Q getFileNameAndLineNumber Firefox-style parsing", () => {
  it("should filter Firefox-style stack frames pointing to Q internals", async () => {
    Q.longStackSupport = true;
    
    const require = createRequire(import.meta.url);
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Create a deferred promise (with longStackSupport, it gets a .stack and .stackCounter)
    const deferred = Q.defer();
    
    // The promise.stack will be a V8-style stack pointing to q.js
    // We need to override it with a Firefox-style stack pointing to q.js
    // Use line 500 which should be within qStartingLine..qEndingLine
    const internalQLine = 500;
    const firefoxStyleQFrame = `internalQFunction@${qPath}:${internalQLine}`;
    const externalFrame = `userFunction@/user/code.js:10`;
    
    // Override the promise's stack with Firefox-style content
    Object.defineProperty(deferred.promise, 'stack', {
      value: `${firefoxStyleQFrame}\n${externalFrame}`,
      configurable: true,
      writable: true
    });
    
    // Create an error with a simple stack
    const error = new Error("test rejection");
    const originalErrorStack = `Error: test rejection\n    at testFunc (/test/file.js:1:1)`;
    Object.defineProperty(error, 'stack', {
      value: originalErrorStack,
      configurable: true,
      writable: true
    });
    
    let capturedError: any;
    const resultPromise = deferred.promise.then(null, (e: any) => {
      capturedError = e;
      return "handled";
    });
    
    deferred.reject(error);
    await resultPromise;
    
    // makeStackTraceLong was called, modifying error.stack
    // With original \d+: Firefox-style line with :500 is parsed correctly
    //   isInternalFrame returns true for qPath:500 → frame is filtered out
    //   error.stack should NOT contain the Firefox-style Q frame
    // With mutated \D+: Firefox-style line with :500 fails to parse (500 is digits)
    //   getFileNameAndLineNumber returns undefined → isInternalFrame returns false
    //   frame is NOT filtered → error.stack SHOULD contain the Firefox-style Q frame
    
    const finalStack = capturedError?.stack || "";
    
    // The internal Q frame should be filtered out with original code
    expect(finalStack).not.toContain(firefoxStyleQFrame);
    
    Q.longStackSupport = false;
  });
});