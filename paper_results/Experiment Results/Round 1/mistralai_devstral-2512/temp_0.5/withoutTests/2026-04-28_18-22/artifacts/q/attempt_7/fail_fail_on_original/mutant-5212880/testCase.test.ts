const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done", () => {
  it("should execute callbacks and return the promise when called", (done) => {
    const promise = Q.resolve(42);
    let fulfilledCalled = false;
    let rejectedCalled = false;

    const result = Q.done(promise,
      (value: number) => {
        fulfilledCalled = true;
        expect(value).toBe(42);
      },
      (error: Error) => {
        rejectedCalled = false;
      }
    );

    // The original implementation should return the promise
    expect(result).toBe(promise);

    // Wait for async execution
    setTimeout(() => {
      expect(fulfilledCalled).toBe(true);
      expect(rejectedCalled).toBe(false);
      done();
    }, 10);
  });
});