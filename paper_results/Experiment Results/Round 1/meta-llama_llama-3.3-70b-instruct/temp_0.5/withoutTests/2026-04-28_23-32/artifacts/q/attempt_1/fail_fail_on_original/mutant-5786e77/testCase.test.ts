import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should call the fulfilled callback with the spreaded array", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    promise.spread(fulfilledSpy);
    expect(fulfilledSpy).toHaveBeenCalledTimes(1);
    expect(fulfilledSpy).toHaveBeenCalledWith(1, 2, 3);
  });
});