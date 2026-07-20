import { Q } from '../../q';

describe('Q', () => {
    it('should filter internal frames from stack traces', async () => {
        const error: Error = new Error('Test error');
        const promise = Q.reject(error);
        const newError: Error = await promise.catch((e: Error) => e);
        const newStackTrace: string | undefined = newError.stack;
        const lines: string[] = newStackTrace?.split('\n') || [];
        const internalFrameFound: boolean = lines.some((line: string) => line.includes('q.js'));
        expect(internalFrameFound).toBe(false);
    });
});