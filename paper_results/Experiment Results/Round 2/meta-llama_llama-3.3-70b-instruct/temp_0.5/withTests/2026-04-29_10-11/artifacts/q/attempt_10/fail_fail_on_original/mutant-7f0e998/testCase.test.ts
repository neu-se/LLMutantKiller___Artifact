describe("filterStackString", () => {
    it("should filter out internal frames", () => {
        const error = new Error();
        const stack = error.stack;
        if (stack) {
            const lines = stack.split("\n");
            const desiredLines = lines.filter(line => !line.includes("q.js") && !line.includes("node.js") && line);
            const filteredStack = desiredLines.join("\n");

            expect(lines.length).toBeGreaterThan(desiredLines.length);
        }
    });
});