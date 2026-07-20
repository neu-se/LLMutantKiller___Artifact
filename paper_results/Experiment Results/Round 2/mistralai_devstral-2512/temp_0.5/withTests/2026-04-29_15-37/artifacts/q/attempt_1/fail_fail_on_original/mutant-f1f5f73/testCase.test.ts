import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
  it("should return a promise when called with a promise and callback", () => {
    const promise = Q.resolve(42);
    const callback = jest.fn();
    const result = Q.tap(promise, callback);
    expect(result).toBeInstanceOf(Promise);
  });
});