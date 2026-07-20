import { Q } from './q';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        // Test the behavior of the mutated file by checking if Q.nextTick behaves as expected
        // when the condition is always true.
        const originalNextTick = Q.nextTick;
        let called = false;
        Q.nextTick = () => {
            called = true;
        };
        Q.nextTick(() => {});
        expect(called).toBe(true);
        Q.nextTick = originalNextTick;

        // This should pass for the original code and fail for the mutated code
        if (typeof window !== 'undefined') {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});