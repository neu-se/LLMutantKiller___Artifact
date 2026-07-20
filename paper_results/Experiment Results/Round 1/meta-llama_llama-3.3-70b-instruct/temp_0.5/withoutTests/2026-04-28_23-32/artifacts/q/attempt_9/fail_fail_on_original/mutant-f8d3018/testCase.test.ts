import { Q } from "./q.js";

describe("Q Promise", () => {
  it("should call progressed callback when provided", () => {
    const progressedSpy = jest.fn();
    const promise = Q(5);
    promise.progress(progressedSpy);
    expect(progressedSpy).toHaveBeenCalledTimes(1);
  });
});