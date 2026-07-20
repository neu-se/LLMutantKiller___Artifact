import { Q } from "./q";

describe("Q.nfapply", () => {
  it("should return a value when called with a callback and arguments", () => {
    const callback = jest.fn();
    const args = [1, 2, 3];
    const result = Q.nfapply(callback, args);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(...args);
  });
});