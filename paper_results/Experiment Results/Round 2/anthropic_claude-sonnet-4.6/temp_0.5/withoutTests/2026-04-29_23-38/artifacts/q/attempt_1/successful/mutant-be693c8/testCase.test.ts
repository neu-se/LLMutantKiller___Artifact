import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject the promise with an error when the timeout expires", async () => {
    jest.useFakeTimers();

    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let rejectionReason: any = undefined;
    let resolved = false;

    timeoutPromise.then(
      () => { resolved = true; },
      (err: any) => { rejectionReason = err; }
    );

    // Advance timers to trigger the timeout
    jest.advanceTimersByTime(200);

    // Allow microtasks/promises to settle
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    jest.useRealTimers();

    expect(resolved).toBe(false);
    expect(rejectionReason).toBeDefined();
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.code).toBe("ETIMEDOUT");
  });
});