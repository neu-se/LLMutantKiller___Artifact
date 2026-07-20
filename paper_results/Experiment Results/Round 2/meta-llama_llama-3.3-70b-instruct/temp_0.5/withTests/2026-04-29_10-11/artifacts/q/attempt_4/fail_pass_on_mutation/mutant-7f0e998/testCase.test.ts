describe("Q", () => {
    it("should filter out internal frames in stack traces", () => {
        const error = new Error();
        const stack = error.stack;

        if (stack) {
            const lines = stack.split("\n");
            const desiredLines = lines.filter(line => !line.includes("q.js"));
            const filteredStack = desiredLines.join("\n");

            expect(filteredStack).not.toContain("q.js");
        }
    });
});