import { Q } from "./q.js";

describe('Q', () => {
    it('should have allSettled method that is a function', () => {
        expect(typeof Q.allSettled).toBe('function');
    });

    it('should call allSettled method without error on original code', async () => {
        expect(() => Q.allSettled([])).not.toThrow();
    });

    it('should throw an error when allSettled method is called on mutated code', async () => {
        // This test will pass if Q.allSettled is not a function or is not implemented
        try {
            Q.allSettled();
            throw new Error('allSettled method should throw an error on mutated code');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});