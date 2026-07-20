import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const stack = promise.catch((e) => e.stack);
        expect(stack).not.toBeNull();
        expect(stack).toContain('at');
    });
});