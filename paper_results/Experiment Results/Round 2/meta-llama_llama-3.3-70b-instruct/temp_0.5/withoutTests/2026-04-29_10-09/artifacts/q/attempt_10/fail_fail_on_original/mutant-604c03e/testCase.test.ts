import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', (done) => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        promise.then(() => {
            throw reason;
        });
        Q.nextTick(() => {
            promise.catch((error: any) => {
                expect(error.message).toBe('Test reason');
                done();
            });
        });
    });
});