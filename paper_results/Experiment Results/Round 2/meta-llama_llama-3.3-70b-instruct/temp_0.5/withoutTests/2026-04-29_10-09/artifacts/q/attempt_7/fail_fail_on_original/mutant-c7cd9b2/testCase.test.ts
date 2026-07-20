describe('error handling', () => {
    it('should correctly handle errors', () => {
        try {
            throw new Error('test error');
        } catch (e: any) {
            const stackLines = e.stack.split('\n');
            const stackLine = stackLines[1];
            const regex = /at ([^ ]+):(\d+):(?:\d)$/;
            const match = regex.exec(stackLine);
            expect(match).toBeTruthy();
            expect(match[1]).toBe('testCase.test.ts');
            expect(match[2]).toBeGreaterThan(0);
        }
    });
});