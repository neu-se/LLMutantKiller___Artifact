import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", (done) => {
        const originalTrackUnhandledRejections = Q.trackUnhandledRejections;
        Q.stopUnhandledRejectionTracking();
        expect(Q.trackUnhandledRejections).toBe(false);
        Q.stopUnhandledRejectionTracking();
        expect(Q.trackUnhandledRejections).toBe(false);
        done();
    });
});