import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import fs from "fs";

describe("Q attempt3 regex", () => {
  it("should parse Firefox-style stack frames with multiple chars before @", async () => {
    Q.longStackSupport = true;

    const qPath = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Read Q's source to find a line that's definitely internal
    // (between qStartingLine and qEndingLine)
    // qStartingLine is captured near the top of the main function
    // qEndingLine is captured near the bottom
    // We find "qStartingLine = captureLine()" and "qEndingLine = captureLine()"
    const qSource = fs.readFileSync(qPath, "utf8");
    const qLines = qSource.split("\n");
    
    let startLine = -1;
    let endLine = -1;
    for (let i = 0; i < qLines.length; i++) {
      if (qLines[i].includes("qStartingLine = captureLine()")) {
        startLine = i + 1; // 1-based
      }
      if (qLines[i].includes("qEndingLine = captureLine()")) {
        endLine = i + 1; // 1-based
      }
    }

    expect(startLine).toBeGreaterThan(0);
    expect(endLine).toBeGreaterThan(startLine);

    // Pick a line in the middle of Q's internal range
    const internalLine = Math.floor((startLine + endLine) / 2);

    const d = Q.defer();

    // Firefox-style frame: "someFunction" has 12 chars before @
    // Original /.*@/ matches -> parsed -> recognized as internal -> filtered OUT
    // Mutated /.@/ does NOT match (needs exactly 1 char) -> not parsed -> kept IN
    const firefoxFrame = `someFunction@${qPath}:${internalLine}`;
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

    // Original: frame parsed, recognized as Q-internal, filtered OUT -> not in stack
    // Mutated:  frame NOT parsed (12 chars before @), kept IN -> appears in stack
    expect(finalStack).not.toContain("someFunction@");
  });
});