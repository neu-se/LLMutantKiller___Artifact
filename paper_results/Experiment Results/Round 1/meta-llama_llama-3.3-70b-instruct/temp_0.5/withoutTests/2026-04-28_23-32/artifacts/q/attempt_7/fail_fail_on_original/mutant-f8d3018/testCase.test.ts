import { Q } from "./q";

describe("Q Promise", () => {
  it("should call progressed callback when provided", (done) => {
    const progressedSpy = jest.fn((value: any) => value);
    const promise = Q(5);
    promise.then((value: any) => {
      expect(value).toBe(5);
      expect(progressedSpy).toHaveBeenCalledTimes(1);
      done();
    }, (error: any) => {
      expect(error).toBeNull();
      done();
    }, progressedSpy);
  });
});