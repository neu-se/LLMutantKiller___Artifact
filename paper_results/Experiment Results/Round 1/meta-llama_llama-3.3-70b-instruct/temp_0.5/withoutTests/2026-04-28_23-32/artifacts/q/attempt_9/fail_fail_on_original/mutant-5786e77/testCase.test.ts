import { Q } from './q';

describe("Q Promise", () => {
  it("should throw an error when spread method does not call the fulfilled callback", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    return promise.then(() => {
      if (!fulfilledSpy.called) {
        throw new Error("Fulfilled callback was not called");
      }
    });
  });
});