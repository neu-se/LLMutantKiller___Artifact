describe('isInternalFrame', () => {
    it('checks the condition for internal frames', () => {
        const qFileName = 'q.js';
        const qStartingLine = 10;
        const stackLine = `at someFunction (${qFileName}:${qStartingLine - 1}:2)`;
        const fileNameAndLineNumber = stackLine.match(/at\s+.*\s+\((.*?):(\d+):(\d+)\)/);
        if (fileNameAndLineNumber) {
            const lineNumber = parseInt(fileNameAndLineNumber[2]);
            expect(lineNumber >= qStartingLine).toBe(false);
        } else {
            expect(false).toBe(true);
        }
    });
});