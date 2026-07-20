const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done", () => {
  it("should actually call the done method on the promise", () => {
    const promise = Q.resolve(42);
    const originalDone = promise.done;

    // Spy on the done method
    promise.done = jest.fn(function(...args) {
      return originalDone.apply(this, args);
    });

    Q.done(promise, () => {}, () => {});

    // The original should call promise.done, the mutated version won't
    expect(promise.done).toHaveBeenCalled();

    // Restore original
    promise.done = originalDone;
  });
});