import { Q } from './q';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        // This should pass for the original code and fail for the mutated code
        if (typeof window !== 'undefined') {
            expect(Q.nextTick).toThrowError();
        } else {
            expect(Q.nextTick).not.toThrowError();
        }
    });
});