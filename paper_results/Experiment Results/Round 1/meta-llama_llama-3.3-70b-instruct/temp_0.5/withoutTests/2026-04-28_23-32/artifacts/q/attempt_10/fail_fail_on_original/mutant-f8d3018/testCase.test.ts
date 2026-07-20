import { Q } from "./q";

describe("Q Promise", () => {
  it("should call progressed callback when provided", (done) => {
    const progressedSpy = jest.fn();
    const promise = Q(5);
    promise.progress(progressedSpy);
    promise.then(() => {
      expect(progressedSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});