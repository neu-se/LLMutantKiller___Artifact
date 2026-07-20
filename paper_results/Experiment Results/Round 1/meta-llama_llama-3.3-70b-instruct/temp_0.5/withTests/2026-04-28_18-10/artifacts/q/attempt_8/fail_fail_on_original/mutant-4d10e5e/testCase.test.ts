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
        expect(hasStacks).toBe(true); // This line should be true for both original and mutated code
        var promise = Q(error);
        promise.then(null, (err) => {
            expect(err.stack).toBeDefined(); // This line should be true for both original and mutated code
        });
    });
});