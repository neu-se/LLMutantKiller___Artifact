import { makePromise } from "./q.js";

describe("makePromise fallback behavior", () => {
  it("should use fallback when descriptor method is missing", () => {
    const fallback = jest.fn(() => "fallback result");
    const promise = makePromise({}, fallback);

    return promise.then((result) => {
      expect(result).toBe("fallback result");
      expect(fallback).toHaveBeenCalled();
    });
  });
});