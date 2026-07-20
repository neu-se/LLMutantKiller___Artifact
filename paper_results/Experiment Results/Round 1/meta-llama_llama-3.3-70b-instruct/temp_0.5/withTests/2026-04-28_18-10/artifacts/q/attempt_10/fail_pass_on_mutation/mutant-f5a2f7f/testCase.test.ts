describe("q", () => {
    it("should capture the line number correctly", () => {
        const error = new Error();
        if (error.stack) {
            const stackLines = error.stack.split("\n");
            if (stackLines.length > 1) {
                const lineNumber = stackLines[1].split(":")[1];
                expect(lineNumber).not.toBeUndefined();
                expect(lineNumber).not.toBeNull();
                expect(lineNumber).not.toBeNaN();
            } else {
                expect(true).toBe(false);
            }
        } else {
            expect(true).toBe(false);
        }
    });
});