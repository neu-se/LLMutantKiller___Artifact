import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with longStackSupport enabled", () => {
  it("should concatenate stack traces with 'From previous event:' separator when a rejection propagates through a promise chain", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    await new Promise<void>((resolve) => {
      Q.reject(new Error("original error"))
        .then(function step1() {
          // This won't be called since we're rejected
        })
        .then(function step2() {
          // This won't be called either
        })
        .fail(function (err: Error) {
          capturedError = err;
          resolve();
        })
        .done();
    });

    expect(capturedError).not.toBeNull();
    expect(capturedError!.stack).toContain("From previous event:");
  });
});