import { Q } from '../../../q.js';

describe('Q', () => {
    it('should correctly handle isStopIteration function', () => {
        // Create a StopIteration exception
        const exception = new Error();

        // Check if the exception is correctly identified as a StopIteration
        // In the original code, this should return false
        const isStopIteration = Q.isStopIteration(exception);

        expect(isStopIteration).toBe(false);

        // In the mutated code, this should return true
        // So, this test case should pass in the original code and fail in the mutated code
    });
});