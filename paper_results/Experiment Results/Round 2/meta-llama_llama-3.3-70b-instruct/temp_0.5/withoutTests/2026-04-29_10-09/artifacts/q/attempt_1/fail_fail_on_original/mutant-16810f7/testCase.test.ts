import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    const originalUnhandledRejections = Q.getUnhandledReasons();

    Q.nextTick(() => {
      Q.untrackRejection(promise);
    });

    Q.nextTick(() => {
      const newUnhandledRejections = Q.getUnhandledReasons();
      expect(newUnhandledRejections.length).toBeLessThan(originalUnhandledRejections.length);
    });
  });
});