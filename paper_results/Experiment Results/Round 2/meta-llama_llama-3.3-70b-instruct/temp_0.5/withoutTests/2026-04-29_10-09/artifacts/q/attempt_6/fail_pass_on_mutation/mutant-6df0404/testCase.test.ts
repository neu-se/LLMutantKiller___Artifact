import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", (done) => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test error');
        Q.nextTick(() => {
            const reasons = Q.getUnhandledReasons();
            Q.stopUnhandledRejectionTracking();
            const promise2 = Q.reject('Test error 2');
            Q.nextTick(() => {
                const newReasons = Q.getUnhandledReasons();
                expect(newReasons.length).toBeLessThan(reasons.length + 1);
                done();
            });
        });
    });
});