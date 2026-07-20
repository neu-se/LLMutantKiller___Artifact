describe('error stack filtering', () => {
    it('should filter out internal frames but include node frames when isNodeFrame returns true', () => {
        const error = new Error('Test error');
        const originalStack = error.stack;

        const isInternalFrame = (line: string) => false;
        const isNodeFrame = (line: string) => true;

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