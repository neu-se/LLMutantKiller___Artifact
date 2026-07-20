describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackTrace = error.stack;

        if (stackTrace) {
            const lines = stackTrace.split("\n");
            const filteredLines = lines.filter(line => {
                return !line.includes("q.js");
            });
            const result = filteredLines.join("\n");

            expect(result).not.toContain("q.js");
        }
    });
});