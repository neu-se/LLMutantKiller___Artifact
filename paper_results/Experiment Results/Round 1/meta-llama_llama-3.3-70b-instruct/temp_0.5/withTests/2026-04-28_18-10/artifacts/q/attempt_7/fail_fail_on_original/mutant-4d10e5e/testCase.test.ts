describe("Q", () => {
    it("should have different behavior when hasStacks is true or false", () => {
        var error = new Error();
        var hasStacks = false;
        try {
            throw error;
        } catch (e) {
            if (e instanceof Error) {
                hasStacks = !!e.stack;
            }
        }
        expect(hasStacks).toBe(false); // This line should be false for the original code
        var promise = Q(error);
        expect(promise.isRejected()).toBe(true);
    });
});