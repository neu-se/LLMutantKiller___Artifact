describe("q", () => {
    it("should capture the line number correctly", () => {
        const error = new Error();
        if (error.stack) {
            const stackLines = error.stack.split("\n");
            if (stackLines.length > 1) {
                expect(stackLines[0]).toContain("Error:");
                expect(stackLines[1]).toContain(__filename);
            } else {
                expect(true).toBe(false);
            }
        } else {
            expect(true).toBe(false);
        }
    });
});