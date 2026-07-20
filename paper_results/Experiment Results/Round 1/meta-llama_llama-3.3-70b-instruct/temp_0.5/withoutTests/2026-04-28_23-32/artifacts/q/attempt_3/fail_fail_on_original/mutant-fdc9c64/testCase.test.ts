import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const filteredStack = Q.filterStackString(stack);
        const qFileName = 'q.js';
        const qStartingLine = 10;
        const qEndingLine = 20;
        const fileNameAndLineNumber = lines.map(line => Q.getFileNameAndLineNumber(line));
        const isInternalFrame = fileNameAndLineNumber.some(([fileName, lineNumber]) => 
            fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine);
        expect(isInternalFrame).toBe(false);
    });
});