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

    Q.done(promise, null, error);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith("Test rejection");
  });

  it("should throw an error when the promise is rejected and no error handler is provided in the mutated code", () => {
    const promise = Q.reject("Test rejection");

    // In the original code, Q.done calls the error handler
    // So, this test should pass on the original code and fail on the mutated code
    expect(() => Q.done(promise)).toThrowError();
  });
});