describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber for invalid stack lines', () => {
        const error = new Error();
        error.stack = "function";
        const stackLine = error.stack.split("\n")[0];
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        expect(attempt3).toBeNull();
    });
});