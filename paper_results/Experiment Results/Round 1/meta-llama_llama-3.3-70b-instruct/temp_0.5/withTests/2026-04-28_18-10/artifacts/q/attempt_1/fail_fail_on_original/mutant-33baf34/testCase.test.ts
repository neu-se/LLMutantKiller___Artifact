import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly parse stack traces', () => {
        const error = new Error('test error');
        error.stack = 'Error: test error\n    at getFileNameAndLineNumber (q.js:123:45)\n    at isInternalFrame (q.js:456:67)';
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(error.stack.split('\n')[1]);
        expect(fileNameAndLineNumber).toEqual(['q.js', 123]);
    });
});