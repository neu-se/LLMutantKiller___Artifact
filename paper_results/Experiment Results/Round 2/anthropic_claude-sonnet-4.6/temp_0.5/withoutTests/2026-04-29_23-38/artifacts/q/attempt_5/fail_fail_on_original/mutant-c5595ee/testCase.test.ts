import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q attempt3 regex", () => {
  it("should parse Firefox-style stack frames with multiple chars before @ symbol", async () => {
    Q.longStackSupport = true;

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    // First, determine Q's internal line range by examining a real stack trace
    // captureLine() uses attempt1 (V8 format) to find Q's file and starting line
    // We need a line number that's definitely between qStartingLine and qEndingLine
    // The Q file is ~1000 lines; qStartingLine is ~40, qEndingLine is ~960
    // Let's find the actual range by throwing an error inside a Q callback
    
    let qInternalLine: number | null = null;
    let qInternalFile: string | null = null;
    
    // Get an actual stack line from within Q to find the real file/line
    const err = new Error("probe");
    const lines = (err.stack || "").split("\n");
    for (const line of lines) {
      // V8 format: "    at functionName (filepath:line:col)"
      const match = /at .+ \((.+q\.js):(\d+):\d+\)/.exec(line);
      if (match) {
        qInternalFile = match[1];
        qInternalLine = parseInt(match[2], 10);
        break;
      }
    }

    // If we can't find Q's file in the stack, the test is inconclusive
    expect(qInternalFile).not.toBeNull();
    expect(qInternalLine).not.toBeNull();

    const d = Q.defer();

    // Firefox-style frame with multi-char function name before @
    // pointing to a line we KNOW is inside Q
    const firefoxFrame = `someFunction@${qInternalFile}:${qInternalLine}`;
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

    // Original: "someFunction@qInternalFile:line" parsed by attempt3
    //           -> recognized as Q-internal -> filtered OUT
    // Mutated:  "someFunction@qInternalFile:line" NOT parsed (12 chars before @)
    //           -> NOT recognized as internal -> kept IN stack
    expect(finalStack).not.toContain("someFunction@");
  });
});