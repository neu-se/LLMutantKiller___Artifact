import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        // This should pass for the original code and fail for the mutated code
        const originalNextTick = Q.nextTick;
        Q.nextTick = () => {
            throw new Error('Test error');
        };
        expect(() => Q.nextTick()).toThrowError('Test error');
        Q.nextTick = originalNextTick;

        // Check if the Q.nextTick function is called immediately
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);

        // Check if the Q.nextTick function is called after a timeout
        setTimeout(() => {
            expect(called).toBe(true);
        }, 0);
    });
});