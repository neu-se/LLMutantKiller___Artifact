describe('Q', () => {
    it('should correctly handle the getFileNameAndLineNumber function', () => {
        const stackLine = "at functionName (filename:123:456)";
        const getFileNameAndLineNumber = (stackLine: string): [string, number] | boolean => {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }

            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }

            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return false;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).not.toBe(false);
    });
});