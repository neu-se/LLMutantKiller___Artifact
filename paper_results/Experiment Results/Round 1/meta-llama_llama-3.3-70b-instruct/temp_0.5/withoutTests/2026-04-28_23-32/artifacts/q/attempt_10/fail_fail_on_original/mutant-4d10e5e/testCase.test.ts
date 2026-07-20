describe("Q", () => {
    it("should not have long stack traces by default", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks = !!e.stack;
        }
        expect(hasStacks).toBe(false);
    });
});