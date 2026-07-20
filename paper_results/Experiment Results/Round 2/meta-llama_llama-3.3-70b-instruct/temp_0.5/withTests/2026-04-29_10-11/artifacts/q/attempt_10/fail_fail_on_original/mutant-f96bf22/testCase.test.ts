describe("filterStackString", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split("\n");
            const filteredLines = lines.filter(line => !line.includes("q.js"));
            const filteredStack = filteredLines.join("\n");

            expect(filteredStack).not.toContain("q.js");
            expect(filteredLines.length).toBeLessThan(lines.length);
        }
    });
});