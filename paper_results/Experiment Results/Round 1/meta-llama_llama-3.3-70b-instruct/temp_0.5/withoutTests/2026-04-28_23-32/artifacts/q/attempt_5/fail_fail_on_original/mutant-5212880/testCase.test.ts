import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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

    expect(() => Q.done(promise, null, error)).toThrowError("Test rejection");
  });
});