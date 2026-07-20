describe("Q", () => {
    it("should correctly determine if an error has a stack trace", () => {
        let hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            const error = e as Error;
            if (error.stack) {
                hasStacks = true;
            }
        }
        expect(hasStacks).toBe(true);

        // Mutated code should not throw an error here
        try {
            try {} catch (e) {}
        } catch (e) {
            hasStacks = false;
        }
        expect(hasStacks).toBe(true);
    });
});