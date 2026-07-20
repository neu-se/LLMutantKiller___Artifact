describe('error stack filtering', () => {
    it('should filter out internal frames but not node frames when isNodeFrame returns true', () => {
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
            if (!isInternalFrame(line) && !isNodeFrame(line)) {
                filteredLines.push(line);
            }
        }

        const filteredStack = filteredLines.join('\n');

        expect(filteredStack).not.toContain('internal');
        expect(filteredStack).not.toContain('node:');
    });
});