describe("filterStackString", () => {
    it("should filter out internal frames and node frames", () => {
        // Create a stack string with internal frames and node frames
        const stackString = `Error: Test error
    at internalFrame (q.js:100:10)
    at nodeFrame (node.js:50:20)
    at externalFrame (test.js:10:10)`;

        // Call filterStackString with the stack string
        const lines = stackString.split("\n");
        let internalFrameCount = 0;
        let nodeFrameCount = 0;
        for (let i = 0; i < lines.length; ++i) {
            const line: string = lines[i];
            if (isInternalFrame(line)) {
                internalFrameCount++;
            }
            if (isNodeFrame(line)) {
                nodeFrameCount++;
            }
        }

        // Check that internal frames and node frames are filtered out
        expect(internalFrameCount).toBe(1);
        expect(nodeFrameCount).toBe(1);
    });
});

function isInternalFrame(stackLine: string): boolean {
    return stackLine.includes("internalFrame");
}

function isNodeFrame(stackLine: string): boolean {
    return stackLine.includes("nodeFrame");
}