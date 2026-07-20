import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', (done) => {
        const promise = Q.reject(new Error());
        promise.catch(() => {
            Q.nextTick(() => {
                const unhandledReasons = Q.getUnhandledReasons();
                expect(unhandledReasons).toHaveLength(0);
                done();
            });
        });
    });
});