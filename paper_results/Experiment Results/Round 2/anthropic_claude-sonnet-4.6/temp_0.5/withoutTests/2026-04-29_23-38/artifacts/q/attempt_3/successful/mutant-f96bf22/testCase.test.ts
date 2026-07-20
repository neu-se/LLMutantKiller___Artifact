import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as path from "path";

describe("filterStackString filters internal Q frames", () => {
  it("should not include Q internal frames in long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a deep promise chain to generate a long stack with Q internal frames
    const p = Q.fcall(function() {
      throw new Error("test error");
    });

    let capturedError: any = null;
    await new Promise<void>((resolve) => {
      p.then(null, function(err: any) {
        capturedError = err;
        resolve();
      });
    });

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    const stack: string = capturedError.stack;
    expect(stack).toBeTruthy();

    // With original: isInternalFrame filters out Q's own stack frames
    // With mutated (if true): Q's own frames are included
    // Q's filename should not appear in filtered stack lines (after the first line which is the error message)
    const stackLines = stack.split("\n").slice(1); // skip error message line
    const qFileLines = stackLines.filter((line: string) => line.includes("q.js"));
    expect(qFileLines.length).toBe(0);
  });
});