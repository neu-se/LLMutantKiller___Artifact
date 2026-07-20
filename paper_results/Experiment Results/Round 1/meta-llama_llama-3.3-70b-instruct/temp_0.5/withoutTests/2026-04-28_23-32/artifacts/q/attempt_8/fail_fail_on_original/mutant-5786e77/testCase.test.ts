import { Q } from '../../q';

describe("Q Promise", () => {
  it("should call the fulfilled callback with the spreaded array", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    return promise.then(() => {
      expect(fulfilledSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call the rejected callback when spread method is called", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    return promise.then(() => {
      expect(rejectedSpy).toHaveBeenCalledTimes(0);
    });
  });
});