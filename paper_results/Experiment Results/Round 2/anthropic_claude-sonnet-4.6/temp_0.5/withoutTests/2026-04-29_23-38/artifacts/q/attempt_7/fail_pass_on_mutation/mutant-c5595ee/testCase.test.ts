import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import fs from "fs";

describe("Q attempt3 regex", () => {
  it("filters Firefox-style Q-internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    // Get Q's path via require.resolve
    const qPath: string = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Get Q's source to find internal line range
    const qSource = fs.readFileSync(qPath, "utf8");
    const qLines = qSource.split("\n");
    
    let startLine = -1;
    let endLine = -1;
    for (let i = 0; i < qLines.length; i++) {
      if (qLines[i].includes("qStartingLine = captureLine()")) {
        startLine = i + 1; // 1-based line numbers
      }
      if (qLines[i].includes("qEndingLine = captureLine()")) {
        endLine = i + 1;
      }
    }

    // Find what qFileName actually is by getting a stack trace that 
    // includes Q's file - we need to find how Q appears in V8 stacks
    // Try to get a stack from inside Q by using a synchronous error
    let actualQFileName: string = qPath; // default to require.resolve path
    
    // Create a deferred and immediately check what source looks like
    const probeDeferred = Q.defer();
    if (probeDeferred.promise.stack) {
      // Q set a stack on the promise - extract the file path from it
      const stackLines = probeDeferred.promise.stack.split("\n");
      for (const line of stackLines) {
        const match = /at .+ \((.+q\.js):(\d+):\d+\)/.exec(line);
        if (match) {
          actualQFileName = match[1];
          break;
        }
      }
    }

    const internalLine = Math.floor((startLine + endLine) / 2);

    const d = Q.defer();
    // Use "fn" (2 chars) before @ - original matches, mutated doesn't
    const firefoxFrame = `fn@${actualQFileName}:${internalLine}`;
    d.promise.stack = firefoxFrame;
    d.promise.stackCounter = 1;

    const testError = new Error("test");
    Object.defineProperty(testError, "stack", {
      value: "Error: test\n    at Context.<anonymous> (/test/file.js:1:1)",
      configurable: true,
      writable: true,
    });

    d.reject(testError);

    let caughtError: any;
    await d.promise.then(null, (e: any) => {
      caughtError = e;
    });

    const finalStack: string = caughtError?.stack ?? "";

    // Original: "fn@actualQFileName:internalLine" parsed by attempt3 (/.*@/)
    //           -> recognized as Q-internal -> filtered OUT
    // Mutated:  "fn@actualQFileName:internalLine" NOT parsed (/.@/ needs exactly 1 char, "fn" is 2)
    //           -> NOT recognized as internal -> kept IN stack
    expect(finalStack).not.toContain("fn@");
  });
});