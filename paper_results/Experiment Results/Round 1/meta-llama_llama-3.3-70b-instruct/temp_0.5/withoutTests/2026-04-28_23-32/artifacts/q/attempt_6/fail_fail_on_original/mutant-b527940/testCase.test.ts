import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    const originalUnhandledRejectionsLength = Q.getUnhandledReasons().length;
    Q.nextTick(() => {
      const newUnhandledRejectionsLength = Q.getUnhandledReasons().length;
      expect(newUnhandledRejectionsLength).toBe(originalUnhandledRejectionsLength + 1);
    });
  });
});