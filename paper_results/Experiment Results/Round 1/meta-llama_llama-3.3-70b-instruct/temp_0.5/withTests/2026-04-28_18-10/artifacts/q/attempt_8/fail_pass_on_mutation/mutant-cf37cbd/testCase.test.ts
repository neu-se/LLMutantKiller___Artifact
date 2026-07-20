describe('Q', () => {
    it('should get the file name and line number from a stack line', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber).not.toBeNull();
        expect(fileNameAndLineNumber[0]).toBe('q.js');
        expect(fileNameAndLineNumber[1]).toBe(123);
    });

    function getFileNameAndLineNumber(stackLine: string) {
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            return [attempt1[1], Number(attempt1[2])];
        }
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        if (attempt2) {
            return [attempt2[1], Number(attempt2[2])];
        }
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            return [attempt3[1], Number(attempt3[2])];
        }
        return null;
    }
});