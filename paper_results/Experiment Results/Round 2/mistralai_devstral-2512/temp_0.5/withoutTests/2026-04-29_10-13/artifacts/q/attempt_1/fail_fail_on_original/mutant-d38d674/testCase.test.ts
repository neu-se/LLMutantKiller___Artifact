import { Q } from "./q.js";

describe("Q.makePromise with fallback", () => {
  it("should use the fallback when no descriptor method is provided", () => {
    const customError = new Error("Custom fallback error");
    const fallback = jest.fn(() => Q.reject(customError));
    const promise = Q.makePromise({}, fallback);

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error) => {
        expect(error).toBe(customError);
        expect(fallback).toHaveBeenCalled();
      }
    );
  });
});