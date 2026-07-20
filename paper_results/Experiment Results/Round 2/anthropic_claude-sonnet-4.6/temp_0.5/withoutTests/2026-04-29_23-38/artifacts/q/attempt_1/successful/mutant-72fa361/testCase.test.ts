import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should augment error stack traces with promise chain information when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: any = null;

    await new Promise<void>((resolve) => {
      Q.fcall(function step1() {
        return Q.fcall(function step2() {
          throw new Error("test error");
        });
      })
        .fail(function (err: any) {
          capturedError = err;
          resolve();
        })
        .done();
    });

    expect(capturedError).not.toBeNull();
    expect(capturedError.stack).toBeDefined();
    expect(capturedError.stack).toContain("From previous event:");
  });
});