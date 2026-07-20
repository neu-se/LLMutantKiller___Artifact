import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should throw an error when spread method is empty", () => {
    const promise = Q([1, 2, 3]);
    const fulfilledSpy = jest.fn();
    const rejectedSpy = jest.fn();
    promise.spread(fulfilledSpy, rejectedSpy);
    expect(() => promise.then()).toThrowError();
  });
});