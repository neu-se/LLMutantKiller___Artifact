import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly filter stack traces', () => {
        const q = Q;
        const isInternalFrame = (fileName, lineNumber, qFileName, qStartingLine, qEndingLine) => {
            return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
        };
        const qFileName = 'q.js';
        const qStartingLine = 10;
        const qEndingLine = 20;
        const fileName = 'q.js';
        const lineNumber = 5;
        expect(isInternalFrame(fileName, lineNumber, qFileName, qStartingLine, qEndingLine)).toBe(false);
        expect(isInternalFrame(fileName, lineNumber, qFileName, qStartingLine, qEndingLine) === (fileName === qFileName && (lineNumber >= qStartingLine || lineNumber <= qEndingLine))).toBe(false);
    });
});