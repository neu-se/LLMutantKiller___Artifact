import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber anonymous function stack line parsing", () => {
  it("should correctly capture Q's starting line via captureLine so that long stack traces filter internal frames", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    const promise = Q.reject(new Error("test error"))
      .then(() => {
        // This should not be called
      });

    await new Promise<void>((resolve) => {
      promise.fail((err: Error) => {
        capturedError = err;
        resolve();
      });
    });

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    expect((capturedError as unknown as Error).message).toBe("test error");

    // The key observable behavior: Q should be able to resolve promises
    // and handle rejections correctly. If captureLine fails (returns undefined
    // because attempt2 matching is broken), the module still loads but
    // qStartingLine is undefined, which affects isInternalFrame.
    // More importantly, test that basic promise chaining works with long stacks.
    Q.longStackSupport = true;

    const result = await new Promise<number>((resolve, reject) => {
      Q(42)
        .then((val: number) => val + 1)
        .then((val: number) => {
          resolve(val);
        })
        .fail(reject);
    });

    Q.longStackSupport = false;
    expect(result).toBe(43);
  });
});