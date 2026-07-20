import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections.length).toBe(1);
    });
  });
});