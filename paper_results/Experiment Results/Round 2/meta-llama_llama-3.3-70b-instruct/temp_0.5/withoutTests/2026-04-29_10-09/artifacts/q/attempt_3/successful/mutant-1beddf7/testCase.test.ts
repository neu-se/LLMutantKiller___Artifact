import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should reject with the correct reason when the resolver function throws an error', () => {
        const promise = Q.promise((resolve, reject, notify) => {
            throw new Error('Test error');
        });
        promise.then(() => {
            throw new Error('Should not be called');
        }, (reason) => {
            expect(reason).toBeInstanceOf(Error);
            expect(reason.message).toBe('Test error');
        });
        expect(promise.isRejected()).toBe(true);
    });
});