import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle unhandled rejections', (done) => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        promise.then(() => {
            throw reason;
        });
        Q.unhandledRejections = [promise];
        Q.untrackRejection(promise);
        Q.nextTick(() => {
            expect(Q.unhandledRejections).not.toContain(promise);
            done();
        });
    });
});