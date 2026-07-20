import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not remove unrelated rejections when a rejection is handled", () => {
    Q.resetUnhandledRejections();

    // Create two rejections - one will be handled, one won't
    const error1 = new Error("unhandled error");
    const error2 = new Error("handled error");

    // First rejection - will remain unhandled
    Q.reject(error1);

    // Second rejection - will be handled
    const handledRejection = Q.reject(error2);
    handledRejection.fail(function () {
      // handle it
    });

    // After handling, the unhandled list should still contain error1 but not error2
    return Q.delay(50).then(function () {
      const reasons = Q.getUnhandledReasons();
      // error1 should still be unhandled
      expect(reasons.some((r: string) => r.indexOf("unhandled error") !== -1)).toBe(true);
      // error2 should have been removed since it was handled
      expect(reasons.some((r: string) => r.indexOf("handled error") !== -1)).toBe(false);
    });
  });
});