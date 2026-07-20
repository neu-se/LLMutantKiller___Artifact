import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', () => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        promise.then(() => {
            throw reason;
        });
        Q.nextTick(() => {
            expect(promise.isRejected()).toBe(true);
            promise.catch((error) => {
                expect(error.message).toBe('Test reason');
            });
        });
    });
});