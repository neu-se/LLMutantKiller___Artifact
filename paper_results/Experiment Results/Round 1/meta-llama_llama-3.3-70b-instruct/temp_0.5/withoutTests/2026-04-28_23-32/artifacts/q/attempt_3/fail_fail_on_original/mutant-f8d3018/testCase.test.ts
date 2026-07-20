import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call progressed callback when provided and return the progressed value", () => {
    const progressedSpy = jest.fn((value: any) => value * 2);
    const promise = Q(5);
    promise.then(void 0, void 0, progressedSpy).then((result: any) => {
      expect(progressedSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(10);
    });
  });
});