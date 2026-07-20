const Q = require('./q').Q;

describe("Q Promise", () => {
  it("should call the fulfilled callback with the spreaded array", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    return promise.then(() => {
      expect(fulfilledSpy).toHaveBeenCalledTimes(1);
      expect(fulfilledSpy).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  it("should throw an error when spread method does not call the fulfilled callback", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    return promise.then(() => {
      if (fulfilledSpy.mock.calls.length === 0) {
        throw new Error("Fulfilled callback was not called");
      }
    });
  });
});