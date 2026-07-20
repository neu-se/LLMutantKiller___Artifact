const Q = require('./q.js').Q;

describe("Q Promise", () => {
  it("should not throw an error when spread method is called", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    expect(() => promise.then()).not.toThrowError();
  });
});