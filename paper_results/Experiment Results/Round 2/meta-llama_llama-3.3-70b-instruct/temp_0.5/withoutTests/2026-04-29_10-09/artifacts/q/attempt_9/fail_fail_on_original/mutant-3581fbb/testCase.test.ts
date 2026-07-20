describe('filterStackString', () => {
    it('should filter out internal and node frames from stack traces', () => {
        const stackString = 'Error: test error\n    at test.js:10:20\n    at node.js:5:10';
        const filteredStringOriginal = filterStackStringOriginal(stackString);
        const filteredStringMutated = filterStackStringMutated(stackString);

        expect(filteredStringOriginal).not.toContain('node.js');
        expect(filteredStringMutated).toContain('node.js');
    });
});

function filterStackStringOriginal(stackString: string): string {
    const lines = stackString.split('\n');
    const desiredLines: string[] = [];

    for (const line of lines) {
        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }

    return desiredLines.join('\n');
}

function filterStackStringMutated(stackString: string): string {
    const lines = stackString.split('\n');
    const desiredLines: string[] = [];

    for (const line of lines) {
        if (!isInternalFrame(line) && isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }

    return desiredLines.join('\n');
}

function isInternalFrame(stackLine: string): boolean {
    return stackLine.includes('internal');
}

function isNodeFrame(stackLine: string): boolean {
    return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
}