import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString filters empty lines", () => {
  it("should produce a stack trace with no empty lines when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    // Create a promise chain that triggers makeStackTraceLong
    const p = Q.fcall(function() {
      return Q.fcall(function() {
        throw new Error("deep error");
      });
    });

    let capturedError: any = null;
    await new Promise<void>((resolve) => {
      p.fail(function(err: any) {
        capturedError = err;
        resolve();
      });
    });

    Q.longStackSupport = false;

    expect(capturedError).toBeTruthy();
    expect(capturedError.stack).toBeTruthy();
    
    const lines: string[] = capturedError.stack.split("\n");
    // Original: empty lines are filtered out
    // Mutated: empty lines are included (if(true) pushes everything)
    const emptyLines = lines.filter((line: string) => line === "");
    expect(emptyLines.length).toBe(0);
  });
});