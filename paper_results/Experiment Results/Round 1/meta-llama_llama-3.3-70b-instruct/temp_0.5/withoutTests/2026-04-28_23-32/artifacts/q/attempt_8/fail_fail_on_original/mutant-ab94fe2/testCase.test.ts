import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when a promise is rejected and no error handler is provided', () => {
        const rejectPromise = Q.reject(new Error('Test error'));
        expect(() => {
            rejectPromise.done();
        }).toThrowError('Test error');
    });
});