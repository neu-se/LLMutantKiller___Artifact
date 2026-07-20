import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout", () => {
  it("should reject with a timeout error when the promise takes too long", () => {
    jest.useFakeTimers();

    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let rejectedError: Error | undefined;
    let fulfilled = false;

    timeoutPromise.then(
      () => { fulfilled = true; },
      (err: Error) => { rejectedError = err; }
    );

    jest.advanceTimersByTime(200);

    jest.useRealTimers();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(fulfilled).toBe(false);
        expect(rejectedError).toBeDefined();
        expect(rejectedError!.message).toMatch(/time/i);
        resolve();
      }, 50);
    });
  });
});