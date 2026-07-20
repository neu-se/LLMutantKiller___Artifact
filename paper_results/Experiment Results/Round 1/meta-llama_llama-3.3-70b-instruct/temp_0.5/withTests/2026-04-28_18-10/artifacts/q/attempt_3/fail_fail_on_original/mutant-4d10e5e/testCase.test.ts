describe("Error Stack", () => {
    it("should not have a stack trace if hasStacks is false", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
        var error = new Error();
        expect(error.stack).toBeUndefined();
    });
});