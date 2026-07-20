describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new error
        const error = new Error();

        // Check if the error's stack property contains the file name and line number
        const stackLines = error.stack.split("\n");
        expect(stackLines.length).toBeGreaterThan(1);
        expect(stackLines[0]).toContain(__filename);
        expect(stackLines[0]).toContain(":");
        const lineNumber = stackLines[0].split(":")[1];
        expect(lineNumber).not.toBeUndefined();
        expect(lineNumber).not.toBeNull();
        expect(lineNumber).not.toBeNaN();
        expect(lineNumber).not.toBe("1");
        expect(lineNumber).not.toBe("");
        expect(lineNumber).not.toBe(" ");
        expect(lineNumber).not.toBe(null);
        expect(lineNumber).not.toBeUndefined();
        expect(lineNumber).not.toBeNull();
        expect(lineNumber).not.toBeNaN();
        expect(lineNumber).not.toBe("0");
        expect(lineNumber).not.toBe("-1");
    });
});