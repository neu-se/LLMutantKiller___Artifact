import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    const unhandledRejectionsBefore = Q.getUnhandledReasons();
    Q.nextTick(() => {
      const unhandledRejectionsAfter = Q.getUnhandledReasons();
      expect(unhandledRejectionsAfter.length).toBe(unhandledRejectionsBefore.length + 1);
    });
  });
});