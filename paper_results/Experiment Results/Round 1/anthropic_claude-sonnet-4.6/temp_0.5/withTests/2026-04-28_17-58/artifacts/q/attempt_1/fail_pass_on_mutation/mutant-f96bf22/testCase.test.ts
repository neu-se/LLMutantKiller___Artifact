import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior with long stack traces", () => {
  it("should filter out internal Q frames and empty lines from long stack traces", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise(function (resolve: any, reject: any) {
        Q.nextTick(function () {
          reject(new Error("test rejection"));
        });
      });
    } catch (err) {
      capturedError = err as Error;
    } finally {
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack = capturedError!.stack || "";

    // With the original code, filterStackString removes empty lines.
    // With the mutated code (if (true)), all lines including empty ones are included.
    // The original filters lines using isInternalFrame and isNodeFrame checks,
    // so consecutive newlines (empty lines between stack frames) should not appear.
    // The mutation would include empty string lines, producing "\n\n" in the output.
    expect(stack).not.toMatch(/\n\n/);
  });
});