describe("Q", () => {
    it("should correctly determine if an error has a stack trace", () => {
        try {
            throw new Error();
        } catch (e) {
            const error = e as Error;
            expect(error.stack).toBeDefined();
        }
        const hasStacks = (function () {
            let hasStacks = true;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }
            return hasStacks;
        })();
        expect(hasStacks).toBe(true);
        try {
            try {} catch (e) {}
            expect(hasStacks).toBe(false);
        } catch (e) {
            expect(e).not.toBeDefined();
        }
    });
});