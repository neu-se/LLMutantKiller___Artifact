describe('Testing getFileNameAndLineNumber function', () => {
    it('should correctly parse the filename and line number from a stack line', () => {
        const error = new Error();
        const stackLine = error.stack.split('\n')[2];
        const attempt1 = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
        const attempt2 = /at ([^ ]+):(\d):(?:\d+)/.exec(stackLine);
        expect(attempt1).not.toBeNull();
        expect(attempt2).toBeNull();
    });
});