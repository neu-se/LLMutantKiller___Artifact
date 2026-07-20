import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise resolution correctly', () => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        promise.then(() => {
            throw reason;
        }).catch((error) => {
            expect(error).toBe(reason);
        });
    });
});