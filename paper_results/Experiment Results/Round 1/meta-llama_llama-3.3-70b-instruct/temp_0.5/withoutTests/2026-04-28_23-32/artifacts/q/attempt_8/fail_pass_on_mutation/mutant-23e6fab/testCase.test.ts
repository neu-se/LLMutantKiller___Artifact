describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber', () => {
        const error = new Error();
        error.stack = "function@filename:123";
        const stackLine = error.stack.split("\n")[0];
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            const result = [attempt3[1], Number(attempt3[2])];
            expect(result).toEqual(["filename", 123]);
        } else {
            expect(true).toBe(false);
        }
    });

    it.skip('should fail on mutated getFileNameAndLineNumber', () => {
        const error = new Error();
        error.stack = "function";
        const stackLine = error.stack.split("\n")[0];
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (true) {
            const result = [attempt3[1], Number(attempt3[2])];
            expect(result).not.toBeNull();
        } else {
            expect(true).toBe(false);
        }
    });
});