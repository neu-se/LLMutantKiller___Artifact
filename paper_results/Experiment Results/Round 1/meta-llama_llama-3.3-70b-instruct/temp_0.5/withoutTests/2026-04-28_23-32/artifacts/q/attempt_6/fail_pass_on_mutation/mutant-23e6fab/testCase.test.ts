describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber for Firefox style stack lines', () => {
        const error = new Error();
        error.stack = "";
        const stackLine = error.stack.split("\n")[0];
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).toBeNull();
    });
});