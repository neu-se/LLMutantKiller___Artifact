import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection respects trackUnhandledRejections flag", () => {
  it("should not track rejections after stopUnhandledRejectionTracking is called", () => {
    // Stop tracking unhandled rejections
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise - in original code, trackRejection returns early
    // In mutated code, trackRejection continues and adds to unhandledReasons
    const error = new Error("test rejection after tracking stopped");
    Q.reject(error);

    // In original: getUnhandledReasons returns [] because trackRejection returned early
    // In mutated: getUnhandledReasons returns [error.stack] because trackRejection continued
    const reasons = Q.getUnhandledReasons();

    expect(reasons).toHaveLength(0);
  });
});