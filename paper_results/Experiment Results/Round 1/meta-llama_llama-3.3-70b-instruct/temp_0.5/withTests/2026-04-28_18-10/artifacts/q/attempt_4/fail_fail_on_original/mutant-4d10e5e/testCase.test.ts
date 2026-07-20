describe("Q", () => {
    it("should have hasStacks as false by default", () => {
        var hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            if (e instanceof Error) {
                hasStacks = !!e.stack;
            }
        }
        expect(hasStacks).toBe(false);
    });
});