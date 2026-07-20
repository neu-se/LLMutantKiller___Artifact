import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", (done) => {
        const originalLength = Q.getUnhandledReasons().length;
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject('Test error');
        Q.nextTick(() => {
            const newLength = Q.getUnhandledReasons().length;
            expect(newLength).toBe(originalLength);
            Q.stopUnhandledRejectionTracking();
            const promise2 = Q.reject('Test error 2');
            Q.nextTick(() => {
                const newLength2 = Q.getUnhandledReasons().length;
                expect(newLength2).toBe(newLength);
                done();
            });
        });
    });
});