import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        error.stack = 'Error\n    at isInternalFrame (q.js:123)\n    at filterStackString (q.js:456)';
        const filteredStack = Q.filterStackString(error.stack);
        expect(filteredStack).not.toContain('q.js');
    });
});