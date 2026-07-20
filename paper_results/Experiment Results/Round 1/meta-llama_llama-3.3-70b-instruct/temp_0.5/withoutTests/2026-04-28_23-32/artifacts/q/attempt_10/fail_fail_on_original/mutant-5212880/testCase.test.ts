import { Q } from "./q.js";

describe("Q.done", () => {
  it("should call the done method on the promise and handle rejections", () => {
    const promise = Q.resolve();
    const fulfilled = jest.fn();
    const rejected = jest.fn();
    const progress = jest.fn();

    Q.done(promise, fulfilled, rejected, progress);

    expect(fulfilled).toHaveBeenCalledTimes(1);
  });

  it("should call the error handler when the promise is rejected", () => {
    const promise = Q.reject("Test rejection");
    const error = jest.fn();

    Q.done(promise, null, error);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith("Test rejection");
  });

  it("should not call the error handler when the promise is resolved", () => {
    const promise = Q.resolve();
    const error = jest.fn();

    Q.done(promise, null, error);

    expect(error).not.toHaveBeenCalled();
  });
});