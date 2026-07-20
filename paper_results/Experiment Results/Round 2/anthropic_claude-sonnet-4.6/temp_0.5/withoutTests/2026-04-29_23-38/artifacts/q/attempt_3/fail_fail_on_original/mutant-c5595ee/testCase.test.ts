import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";

describe("Q attempt3 regex mutation", () => {
  it("should parse Firefox-style stack frames with multiple chars before @", async () => {
    Q.longStackSupport = true;
    
    // Get Q's resolved file path
    const require = createRequire(import.meta.url);
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // We need to know Q's internal line range (qStartingLine to qEndingLine)
    // captureLine() is called twice in q.js - once near top, once near bottom
    // The file is ~1000 lines, so lines 50-950 should be "internal"
    // Let's use line 500 as a safe bet
    
    const d = Q.defer();
    
    // Firefox-style frame: "functionName@filepath:linenum"
    // "someFunction" has 12 chars before @, so:
    // - Original /.*@/ matches (0+ chars)
    // - Mutated /.@/ does NOT match (needs exactly 1 char)
    const internalFirefoxFrame = `someFunction@${qPath}:500`;
    d.promise.stack = internalFirefoxFrame;
    d.promise.stackCounter = 1;
    
    const testError = new Error("test");
    Object.defineProperty(testError, "stack", {
      value: "Error: test\n    at Context.<anonymous> (/test/file.js:1:1)",
      configurable: true,
      writable: true
    });
    
    d.reject(testError);
    
    let caughtError: any;
    await d.promise.then(null, (e) => { caughtError = e; });
    
    const finalStack = caughtError?.stack ?? "";
    
    // With original regex:
    //   "someFunction@qPath:500" is parsed by attempt3 -> [qPath, 500]
    //   isInternalFrame checks: fileName === qFileName && 500 >= qStartingLine && 500 <= qEndingLine
    //   If true, the frame is filtered OUT of the stack
    //
    // With mutated regex:
    //   "someFunction@qPath:500" is NOT parsed (12 chars before @, needs exactly 1)
    //   isInternalFrame returns false -> frame is kept IN the stack
    
    // So: original -> "someFunction@" NOT in finalStack
    //     mutated  -> "someFunction@" IS in finalStack
    
    expect(finalStack).not.toContain("someFunction@");
  });
});