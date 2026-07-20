import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('q', () => {
    it('should correctly handle stack traces from Firefox', () => {
        const error = new Error('Test error');
        const stack = error.stack;
        const attempt = stack.match(/.*@(.+):(\d+):(\d+)/);
        expect(attempt).not.toBeNull();
    });
});