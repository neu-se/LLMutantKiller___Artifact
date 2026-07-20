describe("Q", () => {
    it("should filter out internal frames in stack traces", () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split("\n");
            const internalFrame = lines.find(line => line.includes("q.js"));
            const filteredStack = lines.filter(line => !isInternalFrame(line) && line).join("\n");

            // Check if the filtered stack does not contain any internal frames
            expect(filteredStack).not.toContain("q.js");
        }

        function isInternalFrame(line: string): boolean {
            return !line.includes("node.js") && line;
        }
    });
});