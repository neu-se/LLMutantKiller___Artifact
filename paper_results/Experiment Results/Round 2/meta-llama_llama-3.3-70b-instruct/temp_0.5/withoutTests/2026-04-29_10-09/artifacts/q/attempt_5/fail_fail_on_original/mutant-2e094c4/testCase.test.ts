import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const isInternalFrameOriginal = (stackLine: string) => {
            var hasStacks = false;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }
            var qStartingLine = 0;
            var qFileName = '';
            var fileNameAndLineNumber = q.getFileNameAndLineNumber(stackLine);
            if (!fileNameAndLineNumber) {
                return false;
            }
            var fileName = fileNameAndLineNumber[0];
            var lineNumber = fileNameAndLineNumber[1];
            return fileName === qFileName &&
                lineNumber >= qStartingLine;
        };
        const isInternalFrameMutated = (stackLine: string) => false;
        const resultOriginal = stackLines.some(isInternalFrameOriginal);
        const resultMutated = stackLines.some(isInternalFrameMutated);
        expect(resultOriginal).not.toBe(resultMutated);
    });
});