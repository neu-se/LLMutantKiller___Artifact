import { Q } from "../../../../../q.js";

describe("Q Promise", () => {
  it("should call progressed callback when provided", (done) => {
    const progressedSpy = jest.fn();
    const promise = Q(5);
    promise.progress((value: any) => {
      expect(value).toBe(5);
      expect(progressedSpy).toHaveBeenCalledTimes(0);
      done();
    });
    promise.then((value: any) => {
      progressedSpy();
    });
  });
});