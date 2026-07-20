import { Q } from "./q.js";

describe("Q.done", () => {
  it("should call the done method on the promise and handle rejections", () => {
    const promise = Q.reject("Test rejection");
    const fulfilled = jest.fn();
    const rejected = jest.fn((error) => {
      throw error;
    });
    const progress = jest.fn();

    expect(() => Q.done(promise, fulfilled, rejected, progress)).toThrow("Test rejection");
  });
});