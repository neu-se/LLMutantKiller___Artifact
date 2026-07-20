import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle StopIteration exceptions', () => {
        // Create a StopIteration exception
        const exception = new Error();
        exception.name = 'StopIteration';

        // Check if the exception is correctly identified as a StopIteration
        const isStopIteration = Q.isStopIteration(exception);
        expect(isStopIteration).toBe(true);

        // Create a non-StopIteration exception
        const nonStopIterationException = new Error();

        // Check if the non-StopIteration exception is not identified as a StopIteration
        const isNotStopIteration = Q.isStopIteration(nonStopIterationException);
        expect(isNotStopIteration).toBe(false);
    });
});