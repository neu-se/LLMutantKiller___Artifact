import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('q', () => {
    it('should correctly handle error stack traces from Firefox', () => {
        const error = new Error('Test error');
        error.stack = 'Error: Test error\n    at http://example.com:123:45';
        const promise = Q((resolve, reject) => {
            reject(error);
        });
        expect(promise.isRejected()).toBe(true);
        const stack = promise.inspect().reason.stack;
        expect(stack).toContain('http://example.com:123:45');
        expect(stack.split('\n')).toHaveLength(2);
        const promise2 = Q(promise);
        expect(promise2.isRejected()).toBe(true);
        const stack2 = promise2.inspect().reason.stack;
        expect(stack2).toContain('http://example.com:123:45');
        expect(stack2.split('\n')).toHaveLength(2);
        const promise3 = promise.then(() => promise2);
        expect(promise3.isRejected()).toBe(true);
        const stack3 = promise3.inspect().reason.stack;
        expect(stack3).toContain('http://example.com:123:45');
        expect(stack3.split('\n')).toHaveLength(2);
        const promise4 = promise.then(() => {
            throw new Error('Test error 2');
        });
        expect(promise4.isRejected()).toBe(true);
        const stack4 = promise4.inspect().reason.stack;
        expect(stack4).toContain('http://example.com:123:45');
        expect(stack4.split('\n')).toHaveLength(3);
        const promise5 = Q.all([promise, promise2, promise3, promise4]);
        expect(promise5.isRejected()).toBe(true);
        const stack5 = promise5.inspect().reason.stack;
        expect(stack5).toContain('http://example.com:123:45');
        expect(stack5.split('\n')).toHaveLength(3);
        const promise6 = promise.catch(() => {
            throw new Error('Test error 3');
        });
        expect(promise6.isRejected()).toBe(true);
        const stack6 = promise6.inspect().reason.stack;
        expect(stack6).toContain('http://example.com:123:45');
        expect(stack6.split('\n')).toHaveLength(3);
        const promise7 = Q.race([promise, promise2, promise3, promise4, promise5, promise6]);
        expect(promise7.isRejected()).toBe(true);
        const stack7 = promise7.inspect().reason.stack;
        expect(stack7).toContain('http://example.com:123:45');
        expect(stack7.split('\n')).toHaveLength(3);
        const promise8 = Q.any([promise, promise2, promise3, promise4, promise5, promise6, promise7]);
        expect(promise8.isRejected()).toBe(true);
        const stack8 = promise8.inspect().reason.stack;
        expect(stack8).toContain('http://example.com:123:45');
        expect(stack8.split('\n')).toHaveLength(3);
    });
});