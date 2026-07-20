import { Q } from "./q";

describe("Q.done", () => {
  it("should call the done method on the promise", () => {
    const promise = Q.resolve();
    const fulfilled = jest.fn();
    const rejected = jest.fn();
    const progress = jest.fn();

    Q.done(promise, fulfilled, rejected, progress);

    expect(fulfilled).toHaveBeenCalledTimes(1);
  });
});