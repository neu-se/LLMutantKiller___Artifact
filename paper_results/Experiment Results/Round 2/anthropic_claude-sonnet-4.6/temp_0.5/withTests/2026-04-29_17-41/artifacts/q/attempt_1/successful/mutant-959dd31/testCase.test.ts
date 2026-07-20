import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout with no custom error", () => {
  it("should reject with a timeout error message when the promise is too slow and no error is provided", () => {
    jest.useFakeTimers();

    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let rejectedError: Error | undefined;
    let resolved = false;

    timeoutPromise.then(
      () => { resolved = true; },
      (err: Error) => { rejectedError = err; }
    );

    jest.advanceTimersByTime(150);

    jest.useRealTimers();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(resolved).toBe(false);
        expect(rejectedError).toBeDefined();
        expect(rejectedError).toBeInstanceOf(Error);
        expect(/time/i.test(rejectedError!.message)).toBe(true);
        resolve();
      }, 50);
    });
  });
});