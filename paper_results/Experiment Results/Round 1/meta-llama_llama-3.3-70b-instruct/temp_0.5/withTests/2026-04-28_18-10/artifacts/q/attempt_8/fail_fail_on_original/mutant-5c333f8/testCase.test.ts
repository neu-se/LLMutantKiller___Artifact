import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('isInternalFrame', () => {
    it('checks the condition for internal frames', () => {
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = function(stackLine: string) {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
            return fileNameAndLineNumber && fileNameAndLineNumber[0] === Q.qFileName && fileNameAndLineNumber[1] <= Q.qStartingLine;
        };
        const stackLine = `at someFunction (${Q.qFileName}:${Q.qStartingLine}:2)`;
        expect(Q.isInternalFrame(stackLine)).toBe(true);
        Q.isInternalFrame = originalIsInternalFrame;
    });
});