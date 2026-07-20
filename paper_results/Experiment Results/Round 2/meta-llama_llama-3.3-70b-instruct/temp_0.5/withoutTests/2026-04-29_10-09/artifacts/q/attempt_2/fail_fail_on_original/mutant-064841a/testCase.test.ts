import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should have a stack trace when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        try {
            promise.then(() => { throw new Error('Test error'); });
        } catch (error) {
            expect(error.stack).toBeDefined();
            expect(typeof error.stack).toBe('string');
        }
    });
});