import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
        Q.stopUnhandledRejectionTracking();
        const originalValue = Q.trackUnhandledRejections;
        expect(originalValue).toBeUndefined();
        Q.stopUnhandledRejectionTracking();
        expect(Q.trackUnhandledRejections).toBeUndefined();
    });
});