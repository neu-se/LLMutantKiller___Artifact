const Q = require('../../../../q');

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        const lines = stack.split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('makeStackTraceLong')) {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });
});