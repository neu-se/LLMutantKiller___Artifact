import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call progressed callback when provided", (done) => {
    const progressedSpy = jest.fn();
    const promise = Q(5);
    promise.then((value) => {
      expect(value).toBe(5);
      done();
    }, (error) => {
      expect(error).toBeNull();
      done();
    }, progressedSpy);
    expect(progressedSpy).toHaveBeenCalledTimes(1);
  });
});