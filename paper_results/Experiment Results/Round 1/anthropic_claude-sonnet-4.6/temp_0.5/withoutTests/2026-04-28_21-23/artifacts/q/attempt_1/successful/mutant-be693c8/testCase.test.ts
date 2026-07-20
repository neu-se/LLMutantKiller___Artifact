import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject the promise with an error when the timeout expires", async () => {
    jest.useFakeTimers();

    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let rejectionReason: any = undefined;
    let wasRejected = false;

    timeoutPromise.then(
      () => {},
      (err: any) => {
        wasRejected = true;
        rejectionReason = err;
      }
    );

    jest.advanceTimersByTime(200);

    // Allow microtasks/promises to flush
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    jest.useRealTimers();

    expect(wasRejected).toBe(true);
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.code).toBe("ETIMEDOUT");
  });
});