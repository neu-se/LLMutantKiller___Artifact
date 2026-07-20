import Q from '../../q';

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        expect(stack).toContain('makeStackTraceLong');
    });
});