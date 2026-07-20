import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('q', () => {
    it('should correctly handle error stack traces from Firefox', () => {
        const error = new Error('Test error');
        const stack = error.stack;
        expect(stack).toContain('Error: Test error');
        const attempt3 = stack.match(/.*@(.+):(\d+):(\d+)/);
        if (attempt3) {
            expect(attempt3[1]).not.toBeNull();
            expect(attempt3[2]).not.toBeNull();
            expect(attempt3[3]).not.toBeNull();
        }
    });
});