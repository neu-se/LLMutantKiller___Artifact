describe('Q', () => {
    it('should throw an error when the regular expression in getFileNameAndLineNumber does not match', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123)';
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        expect(attempt2).toBeNull();
    });
});