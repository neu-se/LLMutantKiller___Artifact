import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("should not empty the error stack when filtering stack frames with long stack support", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    await Q.reject(new Error("test rejection"))
      .then(null, function (err: Error) {
        capturedError = err;
      });

    expect(capturedError).not.toBeNull();
    // Original: filterStackString iterates lines, returns non-empty filtered stack
    // Mutated: loop never runs (i >= lines.length), returns "", stack becomes ""
    expect(capturedError!.stack).not.toBe("");
    expect(capturedError!.stack).toBeTruthy();
  });
});