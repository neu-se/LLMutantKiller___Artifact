import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
  it("should demonstrate the difference between tracked and untracked rejections", () => {
    // First rejection should be tracked
    Q.resetUnhandledRejections();
    Q.reject("first rejection");
    const firstCount = Q.getUnhandledReasons().length;

    // After stopping tracking, second rejection should not be tracked
    Q.stopUnhandledRejectionTracking();
    Q.reject("second rejection");
    const secondCount = Q.getUnhandledReasons().length;

    // The count should remain the same after stopping tracking
    expect(secondCount).toBe(firstCount);
  });
});