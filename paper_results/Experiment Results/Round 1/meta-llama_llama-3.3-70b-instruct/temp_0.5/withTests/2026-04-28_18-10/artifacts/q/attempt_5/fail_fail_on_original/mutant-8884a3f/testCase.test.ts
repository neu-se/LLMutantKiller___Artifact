import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should create a promise with a stack trace when longStackSupport is enabled', () => {
        q.longStackSupport = true;
        const promise = q(function () {
            return q.reject(new Error('Test error'));
        });
        expect(promise.stack).toBeDefined();
    });
});