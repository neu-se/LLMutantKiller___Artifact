import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
    const promise = q.resolve().then(() => { throw new Error(); });
    q.stopUnhandledRejectionTracking();
    promise.catch(() => {});
    // If Q.stopUnhandledRejectionTracking is working correctly, the unhandled rejection should not be tracked
    expect(q.getUnhandledReasons()).toEqual([]);
  });
});