import { Q } from '../../../q';

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error('Test error');
        error.stack = 'Error: Test error\n    at foo (file:///path/to/file.js:10:12)\n    at bar (file:///path/to/file.js:20:12)';
        const promise = Q.reject(error);
        return promise.catch((err: any) => {
            const stackLines = err.stack.split('\n');
            expect(stackLines.length).toBeGreaterThan(1);
            expect(stackLines[0]).toContain('Error: Test error');
            expect(stackLines[1]).toContain('at foo');
            expect(stackLines[2]).toContain('at bar');
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLines[1]);
            if (attempt3) {
                expect(attempt3[2]).toMatch(/^\d+$/);
            }
        });
    });
});