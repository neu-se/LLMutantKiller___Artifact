import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import path from "path";

describe("Q attempt3 regex", () => {
  it("should parse Firefox-style stack frames with multiple chars before @ and filter Q-internal frames", async () => {
    Q.longStackSupport = true;

    // Get Q's file path using require.resolve (CommonJS compatible)
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");

    const d = Q.defer();

    // Firefox-style frame with multi-char function name before @
    // "someFunction" (12 chars) before @ means:
    // - Original /.*@/ matches (0+ chars before @)
    // - Mutated /.@/ does NOT match (needs exactly 1 char before @)
    const firefoxFrame = `someFunction@${qPath}:500`;
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

    // Original: "someFunction@qPath:500" is parsed by attempt3
    //           recognized as Q-internal frame, filtered OUT of stack
    // Mutated:  "someFunction@qPath:500" NOT parsed (12 chars before @, needs exactly 1)
    //           NOT recognized as internal, kept IN stack
    expect(finalStack).not.toContain("someFunction@");
  });
});