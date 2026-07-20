import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle getFileNameAndLineNumber correctly', () => {
        const error = new Error();
        const stackLine = error.stack && error.stack.split('\n')[1];
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
    });
});