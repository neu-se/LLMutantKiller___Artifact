import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should correctly handle isStopIteration function', () => {
        const exception = new Error();

        const isStopIteration = Q.isStopIteration(exception);

        expect(isStopIteration).toBe(false);

        const stopIterationException = new Error('StopIteration');

        expect(Q.isStopIteration(stopIterationException)).toBe(true);
    });
});