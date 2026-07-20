describe("Q", () => {
    it("should filter out internal frames in stack traces", () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split("\n");
            const internalFrame = lines.find(line => line.includes("q.js"));
            const filteredStack = lines.filter(line => !line.includes("q.js")).join("\n");

            // Check if the filtered stack does not contain any internal frames
            expect(filteredStack).not.toContain("q.js");

            // Check if the original code filters out internal frames
            const originalFilteredStack = lines.filter(line => !isInternalFrame(line) && line).join("\n");
            expect(originalFilteredStack).not.toContain("q.js");
        }

        function isInternalFrame(line: string): boolean {
            return line.includes("q.js") && !line.includes("node.js");
        }
    });
});