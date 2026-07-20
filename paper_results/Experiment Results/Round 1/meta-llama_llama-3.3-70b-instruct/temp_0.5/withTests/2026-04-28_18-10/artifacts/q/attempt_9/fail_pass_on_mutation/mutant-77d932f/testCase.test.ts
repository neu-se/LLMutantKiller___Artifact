describe("Error", () => {
    it("should have a stack property that includes a filename and line number", () => {
        const error = new Error("Test error");
        const stack = error.stack;
        expect(stack).toContain(__filename);
    });
});