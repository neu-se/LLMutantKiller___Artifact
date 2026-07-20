import { Q } from '../../../../../../../q';

describe('isInternalFrame', () => {
    it('should return false for non-internal frames', () => {
        const stackLine = 'at someFunction (someFile.js:1:2)';
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });

    it('should return true for internal frames', () => {
        const stackLine = 'at Q.nextTick (q.js:123:45)';
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });

    it('should return false for a line number greater than qStartingLine', () => {
        const stackLine = `at someFunction (${Q.qFileName}:1:2)`;
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = function(stackLine) {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
            return fileNameAndLineNumber && fileNameAndLineNumber[0] === Q.qFileName && fileNameAndLineNumber[1] > Q.qStartingLine;
        };
        expect(Q.isInternalFrame(stackLine)).toBe(false);
        Q.isInternalFrame = originalIsInternalFrame;
    });

    it('should return true for a line number greater than or equal to qStartingLine', () => {
        const stackLine = `at someFunction (${Q.qFileName}:${Q.qStartingLine}:2)`;
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = function(stackLine) {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
            return fileNameAndLineNumber && fileNameAndLineNumber[0] === Q.qFileName && fileNameAndLineNumber[1] >= Q.qStartingLine;
        };
        expect(Q.isInternalFrame(stackLine)).toBe(true);
        Q.isInternalFrame = originalIsInternalFrame;
    });
});