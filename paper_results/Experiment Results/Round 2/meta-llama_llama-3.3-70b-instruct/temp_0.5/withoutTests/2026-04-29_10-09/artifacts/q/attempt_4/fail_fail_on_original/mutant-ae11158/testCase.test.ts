import { Q } from "./q";

describe("Q.nfapply", () => {
  it("should return a promise that resolves when the callback is called", () => {
    const callback = jest.fn();
    const promise = Q.nfapply(callback, []);
    expect(promise).toBeInstanceOf(Q.Promise);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});