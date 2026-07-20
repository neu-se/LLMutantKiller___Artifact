import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', () => {
        const promise = Q.reject(new Error('Test reason'));
        promise.then(() => {
            throw new Error('This should not be reached');
        }).catch((error) => {
            expect(error.message).toBe('Test reason');
        });
    });
});