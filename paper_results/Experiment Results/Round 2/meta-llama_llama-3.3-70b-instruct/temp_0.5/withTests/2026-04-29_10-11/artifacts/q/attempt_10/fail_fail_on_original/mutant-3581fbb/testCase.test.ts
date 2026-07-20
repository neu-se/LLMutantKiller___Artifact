describe('error stack filtering', () => {
    it('should filter out internal frames and include node frames when isNodeFrame returns false', () => {
        const error = new Error('Test error');
        const originalStack = error.stack;

        if (!originalStack) {
            throw new Error('Stack is not available');
        }

        const isInternalFrame = (line: string) => line.includes('internal');
        const isNodeFrame = (line: string) => line.includes('node:');

        const lines = originalStack.split('\n');
        const filteredLines: string[] = [];

        for (const line of lines) {
            if (!isInternalFrame(line) && isNodeFrame(line)) {
                filteredLines.push(line);
            }
        }

        const filteredStack = filteredLines.join('\n');

        expect(filteredStack).toContain('node:');
    });
});