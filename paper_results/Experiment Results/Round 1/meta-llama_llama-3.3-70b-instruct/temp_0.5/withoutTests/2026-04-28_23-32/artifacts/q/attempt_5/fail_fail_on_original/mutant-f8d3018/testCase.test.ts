import { Q } from "./q";

describe("Q Promise", () => {
  it("should call progressed callback when provided", (done) => {
    const progressedSpy = jest.fn();
    const promise = Q(5);
    promise.then(void 0, void 0, progressedSpy);
    setTimeout(() => {
      expect(progressedSpy).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});