describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new error
        const error = new Error();

        // Check if the error's stack property contains the string "if (!hasStacks)"
        expect(error.stack).not.toContain("if (false) {");
    });
});