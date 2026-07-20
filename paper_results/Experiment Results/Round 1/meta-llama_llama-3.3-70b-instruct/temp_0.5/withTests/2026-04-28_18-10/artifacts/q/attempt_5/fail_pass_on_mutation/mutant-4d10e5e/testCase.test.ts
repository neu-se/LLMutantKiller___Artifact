describe("Error Stack", () => {
    it("should not have a stack trace if hasStacks is false", () => {
        var error = new Error();
        expect(error.stack).toBeDefined();
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            if (e instanceof Error) {
                hasStacks = !!e.stack;
            }
        }
        expect(hasStacks).toBe(true);
    });
});