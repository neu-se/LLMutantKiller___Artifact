import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with an Error object when timeout occurs and no custom error is provided", async () => {
    jest.useFakeTimers();
    
    const deferred = Q.defer();
    const timedOut = deferred.promise.timeout(50);
    
    let rejectionReason: any;
    const catchPromise = timedOut.then(
      () => { throw new Error("Should not fulfill"); },
      (err: any) => { rejectionReason = err; }
    );
    
    jest.advanceTimersByTime(100);
    
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    
    expect(rejectionReason).toBeInstanceOf(Error);
    expect(rejectionReason.message).toMatch(/timed out/i);
    
    jest.useRealTimers();
  });
});