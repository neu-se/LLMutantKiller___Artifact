describe("Q", () => {
    it("should correctly determine if an error has a stack trace", () => {
        let hasStacks = true;
        try {
            throw new Error();
        } catch (e) {
            const error = e as Error;
            hasStacks = !!error.stack;
        }
        expect(hasStacks).toBe(true);
        try {
            try {
                throw new Error();
            } catch (e) {
                const error = e as Error;
                error.stack = undefined;
            }
            hasStacks = false;
        } catch (e) {
            expect(e).toBeUndefined();
        }
        expect(hasStacks).toBe(false);
    });
});