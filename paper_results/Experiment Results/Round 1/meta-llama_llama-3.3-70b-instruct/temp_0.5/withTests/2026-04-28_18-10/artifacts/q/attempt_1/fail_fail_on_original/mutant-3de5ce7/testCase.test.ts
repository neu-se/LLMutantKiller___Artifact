import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error('Test error');
        error.stack = 'Error: Test error\n    at foo (file:///path/to/file.js:10:12)\n    at bar (file:///path/to/file.js:20:12)';
        const promise = Q.reject(error);
        return promise.catch((err) => {
            expect(err.stack).toContain('foo');
            expect(err.stack).toContain('bar');
        });
    });
});