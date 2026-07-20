describe('Q', () => {
    it('should correctly handle the stack line and extract the file name and line number', () => {
        const error = new Error();
        const stackLines = error.stack?.split('\n');
        const stackLine = stackLines?.[2];
        if (stackLine) {
            const result = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (result) {
                expect(result[1]).toBe("filename");
                expect(result[2]).toBe("123");
            } else {
                throw new Error('Failed to parse stack line');
            }
        } else {
            throw new Error('Failed to get stack line');
        }
    });
});