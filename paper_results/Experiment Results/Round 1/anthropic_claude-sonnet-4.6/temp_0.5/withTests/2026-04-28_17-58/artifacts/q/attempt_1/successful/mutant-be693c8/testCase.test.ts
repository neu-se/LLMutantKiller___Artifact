import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with a timeout error when the promise takes too long", () => {
    jest.useFakeTimers();

    const deferred = Q.defer();
    const timeoutPromise = deferred.promise.timeout(100);

    let rejectedError: any = null;
    let resolved = false;

    timeoutPromise.then(
      () => { resolved = true; },
      (err: any) => { rejectedError = err; }
    );

    jest.advanceTimersByTime(150);

    jest.useRealTimers();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(resolved).toBe(false);
        expect(rejectedError).not.toBeNull();
        expect(rejectedError).toBeDefined();
        expect(rejectedError.message).toMatch(/time/i);
        resolve();
      }, 50);
    });
  });
});