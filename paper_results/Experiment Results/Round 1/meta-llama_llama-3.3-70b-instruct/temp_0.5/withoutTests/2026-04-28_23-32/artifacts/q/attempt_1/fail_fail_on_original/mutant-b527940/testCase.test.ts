import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    const unhandledRejections = Q.getUnhandledReasons();
    expect(unhandledRejections.length).toBe(1);
    promise.catch(() => {});
    Q.nextTick(() => {
      const updatedUnhandledRejections = Q.getUnhandledReasons();
      expect(updatedUnhandledRejections.length).toBe(0);
    });
  });
});