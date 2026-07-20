describe("Q", () => {
    it("should not have long stack traces by default", () => {
        const originalCode = () => {
            var hasStacks = false;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }
            return hasStacks;
        };

        const mutatedCode = () => {
            var hasStacks = true;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }
            return hasStacks;
        };

        expect(originalCode()).toBe(false);
        expect(mutatedCode()).toBe(true);
    });
});