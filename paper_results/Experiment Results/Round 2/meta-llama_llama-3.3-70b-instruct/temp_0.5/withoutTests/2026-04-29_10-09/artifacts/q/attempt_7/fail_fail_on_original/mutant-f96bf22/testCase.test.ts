const q = require('./q.js');

describe('Q', () => {
    it('should filter internal frames from stack traces', async () => {
        const error = new Error('Test error');
        const promise = q.reject(error);
        const newError = await promise.catch((e) => e);
        const newStackTrace = newError.stack;
        const lines = newStackTrace.split('\n');
        const internalFrameFound = lines.some((line) => line.includes('q.js'));
        expect(internalFrameFound).toBe(false);
    });
});