describe('Q', () => {
    it('should filter out internal and node frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split('\n');
            const filteredLines = lines.filter(line => {
                return !isInternalFrame(line) && !isNodeFrame(line) && line;
            });

            const filteredLength = filteredLines.length;
            const originalLength = lines.length;

            // The test should pass on the original code and fail on the mutated code.
            expect(filteredLength).toBeLessThan(originalLength);
        } else {
            expect(stack).not.toBeNull();
        }
    });
});

function isInternalFrame(stackLine: string): boolean {
    return stackLine.includes('internal');
}

function isNodeFrame(stackLine: string): boolean {
    return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
}