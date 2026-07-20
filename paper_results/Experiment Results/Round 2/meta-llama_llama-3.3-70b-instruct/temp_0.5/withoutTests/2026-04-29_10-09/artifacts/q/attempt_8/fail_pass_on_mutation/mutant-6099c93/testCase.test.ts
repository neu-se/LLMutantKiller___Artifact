import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', (done) => {
        const promise = Q.reject(new Error());
        promise.catch(() => {
            Q.nextTick(() => {
                expect(Q.getUnhandledReasons()).toHaveLength(0);
                done();
            });
        });
    });
});