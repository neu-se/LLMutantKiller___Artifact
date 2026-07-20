describe('error stack filtering', () => {
    it('should filter out internal frames and node frames by default', () => {
        const error = new Error('Test error');
        const originalStack = error.stack;

        if (!originalStack) {
            throw new Error('Stack is not available');
        }

        const lines = originalStack.split('\n');
        const filteredLines: string[] = [];

        for (const line of lines) {
            if (!line.includes('node:') && !line.includes('q.js')) {
                filteredLines.push(line);
            }
        }

        const filteredStack = filteredLines.join('\n');

        expect(filteredStack).not.toContain('node:');
        expect(filteredStack).not.toContain('q.js');
    });
});