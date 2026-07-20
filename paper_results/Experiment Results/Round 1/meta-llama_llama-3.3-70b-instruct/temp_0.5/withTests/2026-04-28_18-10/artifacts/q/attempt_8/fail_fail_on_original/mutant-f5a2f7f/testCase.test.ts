describe("q", () => {
    it("should capture the line number correctly", () => {
        const error = new Error();
        if (error.stack) {
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
            expect(lineNumber).not.toBe("2");
            expect(lineNumber).not.toBe("3");
            expect(lineNumber).not.toBe("4");
            expect(lineNumber).not.toBe("5");
            expect(lineNumber).not.toBe("6");
            expect(lineNumber).not.toBe("7");
            expect(lineNumber).not.toBe("8");
            expect(lineNumber).not.toBe("9");
            expect(lineNumber).not.toBe("10");
            expect(lineNumber).not.toBe("11");
            expect(lineNumber).not.toBe("12");
        } else {
            expect(true).toBe(false);
        }
    });
});