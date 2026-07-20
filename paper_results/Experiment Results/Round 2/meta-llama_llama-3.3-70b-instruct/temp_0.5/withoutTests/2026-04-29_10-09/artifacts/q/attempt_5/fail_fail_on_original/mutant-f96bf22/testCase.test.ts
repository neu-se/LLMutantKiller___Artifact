import { Q } from './q';

describe('Q', () => {
    it('should filter internal frames from stack traces', async () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const newError: any = await promise.catch((e: any) => e);
        const newStackTrace: string | undefined = newError.stack;
        const lines: string[] = newStackTrace?.split('\n') || [];
        const internalFrameFound = lines.some((line: string) => line.includes('q.js'));
        expect(internalFrameFound).toBe(false);
    });
});