import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should have a stack trace when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        expect(promise.stack).toBeDefined();
        expect(typeof promise.stack).toBe('string');
    });
});