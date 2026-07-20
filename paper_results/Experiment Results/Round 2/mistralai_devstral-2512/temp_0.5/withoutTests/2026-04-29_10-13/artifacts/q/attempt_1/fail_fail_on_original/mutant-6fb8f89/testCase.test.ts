import { Q } from "./q.js";

describe("Q.spread", () => {
  it("should call the fulfilled callback with spread arguments", async () => {
    const fulfilled = jest.fn((a: number, b: number) => a + b);
    const rejected = jest.fn();
    const promise = Q.all([Q(1), Q(2)]).spread(fulfilled, rejected);

    await promise;

    expect(fulfilled).toHaveBeenCalledWith(1, 2);
    expect(rejected).not.toHaveBeenCalled();
  });
});