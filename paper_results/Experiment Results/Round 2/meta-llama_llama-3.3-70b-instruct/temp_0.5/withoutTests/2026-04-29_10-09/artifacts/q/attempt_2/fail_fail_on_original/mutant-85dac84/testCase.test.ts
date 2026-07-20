import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = Q.resolve();
        const rejectedPromise = promise.thenReject(new Error('Test error'));
        rejectedPromise.then(() => {
            throw new Error('Promise was not rejected');
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Test error');
        });
    });
});