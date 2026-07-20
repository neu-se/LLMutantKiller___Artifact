import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('filterStackString', function () {
    it('should filter out internal frames', function () {
        var error = new Error();
        var stack = error.stack;
        var filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toContain('filterStackString');
    });

    it('should not filter out non-internal frames', function () {
        var error = new Error();
        var stack = error.stack;
        var lines = stack.split('\n');
        var lastLine = lines[lines.length - 1];
        var filteredStack = Q.filterStackString(stack);
        expect(filteredStack).toContain(lastLine);
    });

    it('should handle edge case where lines.length is 0', function () {
        var stack = '';
        var filteredStack = Q.filterStackString(stack);
        expect(filteredStack).toBe('');
    });

    it('should handle edge case where lines.length is greater than the actual number of lines', function () {
        var stack = 'line1\nline2\nline3';
        var lines = stack.split('\n');
        var filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toBe('');
    });
});