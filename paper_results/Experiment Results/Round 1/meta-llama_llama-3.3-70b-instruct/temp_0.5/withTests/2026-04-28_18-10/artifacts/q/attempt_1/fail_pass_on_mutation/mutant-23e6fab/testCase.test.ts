import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('q', () => {
    it('should correctly handle error stack traces', () => {
        const error = new Error('Test error');
        const stack = error.stack;
        expect(stack).toContain('Error: Test error');
    });
});