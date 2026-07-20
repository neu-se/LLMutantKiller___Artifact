import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should reject with an error when a promise is rejected', () => {
        const promise = Q.reject(new Error('Test error'));
        expect(promise.then(() => {
            throw new Error('Should not be called');
        }, (error) => {
            return error.message;
        })).resolves.toBe('Test error');
    });
});