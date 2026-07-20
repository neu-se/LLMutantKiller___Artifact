const Q = require("./q.js");

describe("Q.makePromise fallback behavior", () => {
  it("should use fallback when descriptor method is missing", () => {
    const fallback = jest.fn(() => "fallback result");
    const promise = Q.makePromise({}, fallback);

    return promise.then((result: any) => {
      expect(result).toBe("fallback result");
      expect(fallback).toHaveBeenCalled();
    });
  });
});