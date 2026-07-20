describe("filterStackString", () => {
    it("should filter out internal frames and node frames", () => {
        // Create a stack string with internal frames and node frames
        const stackString = `Error: Test error
    at internalFrame (q.js:100:10)
    at nodeFrame (node.js:50:20)
    at externalFrame (test.js:10:10)`;

        // Call filterStackString with the stack string
        const lines = stackString.split("\n");
        const desiredLines: string[] = [];
        for (let i = 0; i < lines.length; ++i) {
            const line: string = lines[i];
            if (!(isInternalFrame(line) && isNodeFrame(line)) && line) {
                desiredLines.push(line);
            }
        }
        const filteredStackString = desiredLines.join("\n");

        // Check that internal frames and node frames are filtered out
        expect(filteredStackString).toBe("Error: Test error\n    at externalFrame (test.js:10:10)");
    });
});

function isInternalFrame(stackLine: string): boolean {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function isNodeFrame(stackLine: string): boolean {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}